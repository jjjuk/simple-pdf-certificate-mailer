require('dotenv').config()

const fetch = require('node-fetch')
const nodemailer = require('nodemailer')
const fs = require('fs')
// const path = require('path')
const html = require('./templates/email')

const sendEmail = async ({ email, name, product, productId, pdfPath }) => {
  // let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  })

  const morfosUrl = new URL(`http://morphos.io/api/inflect-name`)

  morfosUrl.searchParams.append('name', name)
  morfosUrl.searchParams.append('_format', 'json')

  const response = await fetch(morfosUrl).then((res) => res.json())

  const morfedName = response.cases[1]

  const info = await transporter.sendMail({
    from: '"💌 d-seminar" <info@d-seminar.ru>', // sender address
    to: 'gmodhl67@gmail.com', // list of receivers
    subject: `Заказ для ${morfedName} с сайта d-seminar.ru`, // Subject line
    text: 'Hello world?', // plain text body
    html: html({ name, productId, product }), // html body
    attachments: [
      {
        filename: 'сертификат d-seminar.pdf',
        path: pdfPath,
      },
    ],
  })

  fs.existsSync(pdfPath) && fs.unlinkSync(pdfPath)

  return info
}

module.exports = sendEmail
