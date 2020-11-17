require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const { getToken, getPassword } = require('./auth')
const createPdf = require('./createPdf')
const sendEmail = require('./sendEmail')
const path = require('path')

const prisma = new PrismaClient()

const createError = require('http-errors')

const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('express-favicon')
const app = express()
const pino = require('express-pino-logger')({
  prettyPrint: true,
})
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(pino)

app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'authorization', 'Authorization'],
  })
)

app.use(favicon(path.join(__dirname, '../client/favicon.ico')))

app.use(express.static(path.join(__dirname, '../client')))

app.use('/images', express.static(path.join(__dirname, './images')))

app.use(async (req, _, next) => {
  const endpopint = req.url.split('/')[1]
  if (
    endpopint === 'setLastCertificateId' ||
    endpopint === 'getLastCertificateId' ||
    endpopint === 'auth'
  ) {
    const password = getPassword(req)

    if (password !== process.env.PASSWORD)
      next(createError(401, 'Invalid token'))
  } else if (endpopint === 'webhook') {
    req.headers.authorization !== `Bearer ${process.env.WEBHOOK_TOKEN}` &&
      next(createError(401, 'Invalid token'))
  }
  next()
})

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.post('/webhook', async (req, res) => {
  const { name, product, email } = req.body

  const productId = Number(product.split('. ')[0].replace(/^\D+/g, '')) || 47088

  const {
    max: { certificateId: lastId },
  } = await prisma.certificate.aggregate({
    max: {
      certificateId: true,
    },
  })

  const certificateId = lastId + 1

  if (!productId) {
    await prisma.certificate.create({
      data: {
        certificateId,
        certificateStatus: false,
        ...req.body,
      },
    })
    res.send({ status: 'Certificate not generated', response: req.body })
  } else {
    const pdfPath = await createPdf({ productId, certificateId, name })

    const emailInfo = await sendEmail({
      email,
      product,
      name,
      productId,
      pdfPath,
    })

    if (!emailInfo || emailInfo?.rejected.length > 0) {
      await prisma.certificate.create({
        data: {
          certificateId,
          certificateStatus: false,
          ...req.body,
        },
      })
      res.send({
        status: 'Fail',
        response: { ...req?.body /* , pdfUrl: pdfPath */ },
      })
    } else {
      console.log(emailInfo)

      await prisma.certificate.create({
        data: {
          certificateId,
          certificateStatus: true,
          ...req.body,
        },
      })
      res.send({
        status: 'Success',
        response: { ...req?.body /* , pdfUrl: pdfPath */ },
      })
    }
  }
})

app.post('/resend', async (req, res, next) => {
  const { id } = req.body

  const {
    email,
    product,
    name,
    certificateId,
  } = await prisma.certificate.findOne({ where: { id } })

  !certificateId && next(404, 'Certificate not found')

  const productId = Number(product.split('. ')[0].replace(/^\D+/g, '')) || 47088

  const pdfPath = await createPdf({ productId, certificateId, name })

  const emailInfo = await sendEmail({
    email,
    product,
    name,
    productId,
    pdfPath,
  })
  console.log(emailInfo)

  res.send({
    status: 'Success',
    response: { ...req.body /* , pdfUrl: pdfPath */ },
  })
})

app.post('/login', (req, res) => {
  const { password } = req?.body

  if (password !== process.env.PASSWORD)
    res.send(createError(401, 'Invalid password.'))
  else {
    const token = getToken()
    res.send({ status: 'Success', token })
  }
})

app.get('/auth', (_, res) => {
  res.send({ status: 'Success' })
})

app.get('/getLastCertificateId', async (_, res) => {
  const {
    max: { certificateId: lastId },
  } = await prisma.certificate.aggregate({
    max: {
      certificateId: true,
    },
  })
  res.send({ lastId })
})

app.post('/setLastCertificateId', async (req, res) => {
  const body = req?.body

  const { certificateId } = body

  const {
    max: { certificateId: lastId },
  } = await prisma.certificate.aggregate({
    max: {
      certificateId: true,
    },
  })

  if (lastId < certificateId)
    prisma.certificate
      .create({
        data: {
          certificateId: Number(certificateId),
        },
      })
      .catch((error) => res.send(createError(409, error)))
      .then((response) => res.send({ response }))
  else {
    await prisma.certificate
      .deleteMany()
      .catch((error) => res.send(createError(409, error)))
      .then(() =>
        prisma.certificate
          .create({
            data: {
              certificateId: Number(certificateId),
            },
          })
          .catch((error) => res.send(createError(409, error)))
          .then((response) => res.send({ response }))
      )
    return res
  }
})

app.listen(3333)
