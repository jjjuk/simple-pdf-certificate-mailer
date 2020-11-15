require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const { getToken, getPassword } = require('./auth')
const createPdf = require('./createPdf')
const path = require('path')

const prisma = new PrismaClient()

// console.log(process.env.PASSWORD)

const createError = require('http-errors')

const fastify = require('fastify')({
  logger: { prettyPrint: true },
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
      max: { sertificateId: lastId },
    } = await prisma.sertificate.aggregate({
      max: {
        sertificateId: true,
      },
    })

    const { sertificateId } = await prisma.sertificate.create({
      data: {
        sertificateId: lastId + 1,
      },
    })

    const url = await createPdf({ productId, sertificateId, name })

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

fastify.get('/getLastSertificateId', async (req, res) => {
  const password = getPassword(req)
  if (password !== process.env.PASSWORD) {
    res.send(createError(401, 'Неверный пароль.'))
  } else {
    const [{ sertificateId: lastId }] = await prisma.sertificate.findMany({
      orderBy: { sertificateId: 'desc' },
      take: 1,
    })
    res.send({ lastId })
  }
})

fastify.post('/setLastSertificateId', (req, res) => {
  const password = getPassword(res)
  if (password !== process.env.PASSWORD) {
    res.send(createError(401, 'Неверный пароль.'))
  } else {
    const body = req?.body

    // console.log('body === ', body)

    const { sertificateId } = body

    prisma.sertificate
      .create({
        data: {
          sertificateId: Number(sertificateId),
        },
      })
      .catch((error) => res.send(createError(409, error)))
      .then((response) => res.send({ response }))
  }
})

fastify.listen(3333, '192.168.1.3', (err, address) => {
  if (err) {
    fastify.log.error(err)
  }
  fastify.log.info(`server listening on ${address}`)
})
