require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const { getToken, getPassword } = require('./auth')
const createPdf = require('./createPdf')
const path = require('path')

const prisma = new PrismaClient()

const createError = require('http-errors')

const fastify = require('fastify')({
  logger: { prettyPrint: true },
})

fastify.register(require('fastify-cors'), {
  origin: '*',
  allowedHeaders: ['Content-Type', 'authorization', 'Authorization'],
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, './templates'),
  prefix: '/public/', // optional: default '/'
})

fastify.post('/webhook', async (req, res) => {
  console.log('body === ', req?.body)

  const { name, product } = req?.body

  const productId = Number(product.split('. ')[0].replace(/^\D+/g, '')) || 47088

  if (!productId)
    res.send({ status: 'Сертивикат не создан', response: req?.body })
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

    res.send({ status: 'Успешно', response: { ...req?.body, pdfUrl: url } })
  }
})

fastify.post('/login', (req, res) => {
  const { password } = req?.body

  if (password !== process.env.PASSWORD)
    res.send(createError(401, 'Неверный пароль.'))
  else {
    const token = getToken()
    res.send({ status: 'Успешно', response: { token } })
  }
})

fastify.get('/auth', (req, res) => {
  const { password } = getPassword(req)

  if (password !== process.env.PASSWORD)
    res.send(createError(401, 'Не авторизован.'))
  else {
    res.send({ status: 'Успешно' })
  }
})

fastify.get('/getLastCertificateId', async (req, res) => {
  const password = getPassword(req)
  if (/* password !== process.env.PASSWORD */ false) {
    res.send(createError(401, 'Неверный пароль.'))
  } else {
    const {
      max: { certificateId: lastId },
    } = await prisma.certificate.aggregate({
      max: {
        certificateId: true,
      },
    })
    res.send({ lastId })
  }
})

fastify.post('/setLastCertificateId', async (req, res) => {
  const password = getPassword(res)
  if (/* password !== process.env.PASSWORD */ false) {
    res.send(createError(401, 'Неверный пароль.'))
  } else {
    const body = req?.body

    // console.log('body === ', body)

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
  }
})

fastify.listen(3333, '192.168.1.3', (err, address) => {
  if (err) {
    fastify.log.error(err)
  }
  fastify.log.info(`server listening on ${address}`)
})
