require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const { getToken, getPassword } = require('./auth')
const createPdf = require('./createPdf')
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

app.use('/templates', express.static(path.join(__dirname, './templates')))

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
  const { name, product } = req?.body

  const productId = Number(product.split('. ')[0].replace(/^\D+/g, '')) || 47088

  if (!productId)
    res.send({ status: 'Certificate not created', response: req?.body })
  else {
    const {
      max: { certificateId: lastId },
    } = await prisma.certificate.aggregate({
      max: {
        certificateId: true,
      },
    })

    const { certificateId } = await prisma.certificate.create({
      data: {
        certificateId: lastId + 1,
      },
    })

    const url = await createPdf({ productId, certificateId, name })

    res.send({ status: 'Succes', response: { ...req?.body, pdfUrl: url } })
  }
})

app.post('/login', (req, res) => {
  const { password } = req?.body

  if (password !== process.env.PASSWORD)
    res.send(createError(401, 'Invalid password.'))
  else {
    const token = getToken()
    res.send({ status: 'Succes', token })
  }
})

app.get('/auth', (_, res) => {
  res.send({ status: 'Succes' })
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
