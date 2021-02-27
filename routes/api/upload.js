const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
  },
})
const upload = multer({ storage })

const File = require('../../models/File')
const IPFS = require('../../utils/ipfs')

router.post('/file', upload.single('file'), async (req, res) => {
  try {
    const link = await IPFS.uploadOnIPFS(req.file.path)
    fs.unlink(req.file.path, function (err) {
      if(err)
        console.error(err)
      console.log('File deleted!');
    })
    if(link === null) {
      return res.status(500).json('Upload failed')
    }
    console.log('https://ipfs.io/ipfs/' + link)
    await new File({link, txid: req.body.txid}).save()
    return res.status(200).json('Success')
  } catch(e) {
    console.error(e)
    fs.unlink(req.file.path, function (err) {
      if(err)
        console.error(err)
      console.log('File deleted!');
    })
    return res.status(500).json(e)
  }
})

router.post('/email', async (req, res) => {
  try {
    const {smtp, server, port, login, password, first_name, last_name, email_sender, email_recipient, message, reference, messageid, txid} = req.body
    return res.status(200).json('Success')
  } catch(e) {
    console.error(e)
    return res.status(500).json(e)
  }
})

module.exports = router