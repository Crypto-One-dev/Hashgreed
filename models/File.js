const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const FileSchema = new Schema({
  assetType: {
    type: String,
    required: true
  },
  assetName: {
    type: String,
    required: true
  },
  assetComment: {
    type: String,
    required: true
  },
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