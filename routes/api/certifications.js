const express = require('express')
const router = express.Router()
const {nodeInteraction} = require('@waves/waves-transactions')
const fs = require('fs')
const moment = require('moment')
const puppeteer = require('puppeteer')
const QRCode = require('qrcode')

const {nodeUrl, smartContract, baseUrl} = require('../../config/keys')
const File = require('../../models/File')

router.post('/getFileCertifications', async (req, res) => {
  try {
    const {address, filter} = req.body
    let certificates = await nodeInteraction.accountData({
      address: smartContract,
      match: filter + '([A-Za-z0-9]*)_' + address
    }, nodeUrl)
    result = []
    for(key in certificates) {
      let value = JSON.parse(certificates[key].value)
      value.key = key
      const txid = key.split('_')[2]
      const found = await File.find({ txid }).limit(1).exec()
      if(found.length > 0)
        value.link = found[0].link
      result.push(value)
    }
    result.sort((x, y) => {
      if(x.timestamp > y.timestamp)
        return -1
      if(x.timestamp < y.timestamp)
        return 1
      return 0
    })
    return res.status(200).json(result)
  } catch(e) {
    console.error(e)
    return res.status(500).json(e)
  }
})

router.post('/searchCertification', async (req, res) => {
  try {
    const {transactionID, hashID, reference} = req.body
    let key = 'NotFound'
    if(hashID)
      key = hashID + '([a-z0-9\-]*)'
    if(reference)
      key = reference + '([a-z0-9\-]*)'
    if(transactionID)
      key = 'data_([a-z]*)_' + transactionID + '_([A-Za-z0-9]*)'
    let certificates = await nodeInteraction.accountData({
      address: smartContract,
      match: key
    }, nodeUrl)
    let keys = Object.keys(certificates)
    certificates = Object.values(certificates)
    if(certificates.length === 1 && !transactionID) {
      certificates = await nodeInteraction.accountData({
        address: smartContract,
        match: 'data_([a-z]*)_' + certificates[0].value + '_([A-Za-z0-9]*)'
      }, nodeUrl)
      keys = Object.keys(certificates)
      certificates = Object.values(certificates)
    }
    if(certificates.length === 1) {
      keys = keys[0].split('_')
      let result = JSON.parse(certificates[0].value)
      result.txid = keys[2]
      result.address = keys[3]
      result.type = keys[1]
      const found = await File.find({ txid: result.txid }).limit(1).exec()
      if(found.length > 0)
        result.link = found[0].link
      return res.status(200).json(result)
    }
    return res.status(200).json(null)
  } catch(e) {
    console.error(e)
    return res.status(500).json(e)
  }
})

router.post('/downloadCertificate', async (req, res) => {
  try {
    const {hash, timestamp, title, txid} = req.body

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    })
    const page = await browser.newPage()
    var html = fs.readFileSync('assets/certificate.html', 'utf8')
    const qr = await QRCode.toDataURL(baseUrl + '/explorer/' + txid)
    var bgImg = fs.readFileSync('assets/certificate_bg.jpg', 'base64')
    const data = {
      title: title,
      reference: title,
      date: moment(timestamp).toString(),
      hash: hash,
      txid: txid,
      qr: qr,
      bgImg: 'data:image/jpg;base64,' + bgImg,
      baseUrl: baseUrl,
    }
    Object.keys(data).forEach(key => {
      html = html.replace('{{' + key + '}}', data[key])
    })
    await page.setContent(html, {
      waitUntil: 'domcontentloaded'
    })
    await page.pdf({
      width: "841px",
      height: "595px",
      printBackground: true,
      path: 'assets/certificate.pdf'
    })
    await browser.close()
    return res.status(200).download('assets/certificate.pdf')
  } catch(e) {
    console.error(e)
    return res.status(500).json(e)
  }
})

module.exports = router