const { verify, sign } = require('jsonwebtoken')

const appSecret = 'pdfcertificatesender1212512'

const getPassword = (req) => {
  // console.log(req.headers.authorization)
  const Authorization = req.headers.authorization
  // console.log(Authorization)
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, appSecret)
    return verifiedToken && verifiedToken.password
  }
}

const getToken = () => sign({ password: process.env.PASSWORD }, appSecret)

module.exports = {
  getPassword,
  getToken,
}
