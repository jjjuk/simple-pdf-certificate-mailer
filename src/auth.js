const { verify, sign } = require('jsonwebtoken')

const appSecret = 'pdfcertificatesender1212512'

const getPassword = (req) => {
  // console.log(req.headers.authorization)
  const Authorization = req.headers.authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    // console.log(token, typeof token)
    if (!!token && token !== 'null'  && token !== 'undefined') {
      const verifiedToken = verify(token, appSecret)
      // console.log(verifiedToken)
      return verifiedToken?.password
    } else return null
  }
}

const getToken = () => sign({ password: process.env.PASSWORD }, appSecret)

module.exports = {
  getPassword,
  getToken,
}
