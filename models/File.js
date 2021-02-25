const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const FileSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  txid: {
    type: String,
    required: true
  },
})

module.exports = File = mongoose.model('files', FileSchema)