const express = require('express')
const router = express.Router()
const {nodeInteraction} = require('@waves/waves-transactions')
const fs = require('fs')
const moment = require('moment')
const puppeteer = require('puppeteer')
const QRCode = require('qrcode')

const {nodeUrl, smartContract, nftContract, baseUrl} = require('../../config/keys')
const File = require('../../models/File')

router.post('/filterCertifications', async (req, res) => {
  try {
    const {filter} = req.body
    let certificates = await nodeInteraction.accountData({
      address: smartContract,
      match: filter
    }, nodeUrl)
    return res.status(200).json(certificates)
  } catch(e) {
    console.error(e)
    return res.status(500).json(e)
  }
})

router.post('/getCertifications', async (req, res) => {
  try {
    const {filter} = req.body
    let certificates = await nodeInteraction.accountData({
      address: smartContract,
      match: filter
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
      key = 'data_([A-Za-z]*)_' + transactionID + '_([A-Za-z0-9]*)'
    let certificates = await nodeInteraction.accountData({
      address: smartContract,
      match: key
    }, nodeUrl)
    let keys = Object.keys(certificates)
    certificates = Object.values(certificates)
    if(certificates.length === 1 && !transactionID) {
      certificates = await nodeInteraction.accountData({
        address: smartContract,
        match: 'data_([A-Za-z]*)_' + certificates[0].value + '_([A-Za-z0-9]*)'
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
    const {hash, hash_title, timestamp, title, txid} = req.body

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
      label: hash_title,
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

const updateAuction = (auction, key, pool, id, suffix) => {
  if(pool[id + suffix]) {
    auction[key] = pool[id + suffix].value
  }
}

router.post('/getAuctions', async (req, res) => {
  try {
    const { address } = req.body
    const height = await nodeInteraction.currentHeight(nodeUrl)
    let auctions = await nodeInteraction.accountData({
      address: nftContract
    }, nodeUrl)
    let result = []
    for(key in auctions) {
      if(key.length === 44) { // auction id
        let auction = {id: key}
        updateAuction(auction, 'end_block', auctions, key, '')
        updateAuction(auction, 'nft_amount', auctions, key, '_lot_amount')
        updateAuction(auction, 'nft_id', auctions, key, '_lot_assetId')
        updateAuction(auction, 'organizer', auctions, key, '_organizer')
        updateAuction(auction, 'price_id', auctions, key, '_priceAssetId')
        updateAuction(auction, 'price', auctions, key, '_startPrice')
        updateAuction(auction, 'bid', auctions, key, '_winAmount')
        updateAuction(auction, 'winner', auctions, key, '_winner')
        updateAuction(auction, 'operator', auctions, key, '_lot_passed')
        const owner = auction.operator ? auction.operator : auction.winner ? auction.winner : auction.organizer
        const found = await File.find({ txid: owner === address ? key + '_original' : key }).limit(1).exec()
        if(found.length > 0)
          auction.avatar = found[0].link
        result.push(auction)
      }
    }
    result.sort((x, y) => {
      if(!x.operator && y.operator)
        return -1
      if(x.operator && !y.operator)
        return 1

      if(x.end_block > y.end_block)
        return -1
      if(x.end_block < y.end_block)
        return 1
        
      return 0
    })
    return res.status(200).json({ height, result })
  } catch(e) {
    console.error(e)
    return res.status(500).json(e)
  }
})

module.exports = router