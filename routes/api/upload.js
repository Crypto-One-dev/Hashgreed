const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path')
const nodemailer = require('nodemailer')
const sharp = require('sharp')

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
const attachment = upload.single('attachment')

const File = require('../../models/File')
const IPFS = require('../../utils/ipfs')
const keys = require('../../config/keys')

router.post('/file', upload.single('file'), async (req, res) => {
  try {
    const link = await IPFS.uploadOnIPFS(req.file.path)
    fs.unlink(req.file.path, function (err) {
      if(err)
        console.error(err)
      console.log('File deleted after upload on IPFS!');
    })
    if(link === null) {
      return res.status(500).json('Upload on IPFS failed!')
    }
    console.log('https://ipfs.io/ipfs/' + link)
    await new File({link, txid: req.body.txid}).save()
    return res.status(200).json('Success')
  } catch(e) {
    console.error(e)
    fs.unlink(req.file.path, function (err) {
      if(err)
        console.error(err)
      console.log('File deleted due to error!');
    })
    return res.status(500).json(e)
  }
})

router.post('/email', async (req, res) => {
  attachment(req, res, err => {
    try {
      if (err instanceof multer.MulterError) {
        console.error(err)
      } else if (err) {
        console.error(err)
      }

      let attach = null, attachName = ''
      if(req.file) {
        attach = fs.readFileSync(req.file.path)
        attachName = req.file.originalname
        fs.unlink(req.file.path, function (err) {
          if(err)
            console.error(err)
          console.log('File deleted after read base64');
        })
      }

      let {smtp, server, port, login, password, first_name, last_name, email_sender, email_recipient, message, reference, messageid, txid} = req.body
      if(smtp === 'open') {
        server = keys.sendBlue.host
        port = keys.sendBlue.port
        login = keys.sendBlue.login
        password = keys.sendBlue.passw
      }
      const transport = nodemailer.createTransport({
        host: server,
        port: port,
        auth: {
          user: login,
          pass: password
        }
      })
      transport.sendMail({
        from: login,
        to: [email_sender, email_recipient],
        subject: `${first_name} ${last_name} sent you a Blockchain Certified Email`,
        html: `<div>${reference}</div><br/><div>${message}</div><br/><div style='color:#7d7d7d; font-size:12px;'>You can reply to this email at: <a href='mailto:${email_sender}'>${email_sender}</a><br/><br/>This email was sent to you from <a href='https://hashgreed.com'>hashgreed.com</a> and may have been certified on the <a href="http://wavesexplorer.com/tx/${txid}">Waves Blockchain</a></div>`,
        messageId: messageid,
        attachments: attach ? [{filename: attachName, content: attach}] : []
      })
      .then(res => {
        console.log('Message sent successfully: ' + JSON.stringify(res))
      })
      .catch(err => {
        console.log('Errors occurred, failed to deliver message');
        if (err.response && err.response.body && err.response.body.errors) {
          err.response.body.errors.forEach(error => console.log('%s: %s', error.field, error.message));
        } else {
          console.log(err);
        }
      })
      return res.status(200).json('Success')
    } catch(e) {
      console.error(e)
      return res.status(500).json(e)
    }
  })
})

router.post('/auction', upload.single('avatar'), async (req, res) => {
  try {
    await sharp(req.file.path).resize(32, 32).toFile(req.file.path + '_resize')
    const resize_link = await IPFS.uploadOnIPFS(req.file.path + '_resize')
    fs.unlink(req.file.path + '_resize', function (err) {
      if(err)
        console.error(err)
      console.log('Resized Image deleted after upload on IPFS!')
    })
    if(resize_link === null) {
      return res.status(500).json('Upload on IPFS failed!')
    }
    console.log('https://ipfs.io/ipfs/' + resize_link)
    await new File({link: resize_link, txid: req.body.txid}).save()

    const link = await IPFS.uploadOnIPFS(req.file.path)
    fs.unlink(req.file.path, function (err) {
      if(err)
        console.error(err)
      console.log('Image deleted after upload on IPFS!')
    })
    if(link === null) {
      return res.status(500).json('Upload on IPFS failed!')
    }
    console.log('https://ipfs.io/ipfs/' + link)
    await new File({link, txid: req.body.txid+'_original'}).save()

    return res.status(200).json('Success')
  } catch(e) {
    console.error(e)
    fs.unlink(req.file.path + '_resize', function (err) {
      if(err)
        console.error(err)
      console.log('Resized Image deleted due to error!');
    })
    fs.unlink(req.file.path, function (err) {
      if(err)
        console.error(err)
      console.log('Image deleted due to error!');
    })
    return res.status(500).json(e)
  }
})

module.exports = router