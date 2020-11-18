require('dotenv').config()

const fetch = require('node-fetch')
const nodemailer = require('nodemailer')
const fs = require('fs')
const html = require('./templates/email')

const sendEmail = async ({ email, name, product, productId, pdfPath }) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASSWORD, 
    },
    tls:{
      secureProtocol: 'TLSv1_method'
      }
  })

  const morfosUrl = new URL(`http://morphos.io/api/inflect-name`)

  morfosUrl.searchParams.append('name', name)
  morfosUrl.searchParams.append('_format', 'json')

  const response = await fetch(morfosUrl).then((res) => res.json())

  const morfedName = response.cases[1]

  const info = await transporter
    .sendMail({
      from: '"💌 d-seminar" <info@d-seminar.ru>', 
      to: 'gmodhl67@gmail.com', 
      subject: `Заказ для ${morfedName} с сайта d-seminar.ru`,
      html: html({ name, productId, product }), 
      attachments: [
        {
          filename: 'сертификат d-seminar.pdf',
          path: pdfPath,
        },
      ],
    })
    .catch((err) => console.log(err))

  fs.existsSync(pdfPath) && fs.unlinkSync(pdfPath)

  return info
}

module.exports = sendEmail
