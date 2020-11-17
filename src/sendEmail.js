require('dotenv').config()

const nodemailer = require('nodemailer')
const path = require('path')
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

  let info = await transporter.sendMail({
    from: '"💌 d-seminar" <info@d-seminar.ru>', // sender address
    to: 'ass12serg@yandex.ru, gmodhl67@gmail.com', // list of receivers
    subject: `Заказ для ${name} с сайта d-seminar.ru`, // Subject line
    text: 'Hello world?', // plain text body
    html: html({ name, productId, product }), // html body
    attachments: [
      {
        filename: 'сертификат d-seminar.pdf',
        path: pdfPath,
      },
    ],
  })

  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

  return info
}

module.exports = sendEmail
