const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const createPdf = async ({ productId, certificateId, name }) => {
  const { html } = require(`./templates/${productId}`)

  console.log(certificateId)

  const contetnt = html(name, certificateId, productId)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(contetnt)

  fs.existsSync(path.join(__dirname, './pdf')) ||
    fs.mkdirSync(path.join(__dirname, './pdf'))

  const pathTo = path.join(__dirname, `./pdf/${certificateId}.pdf`)

  await page.pdf({
    path: pathTo,
    pageRanges: '1',
    height: '8.27in',
    width: '11.7in',
    printBackground: true,
  })

  await browser.close()

  return pathTo
}

module.exports = createPdf
