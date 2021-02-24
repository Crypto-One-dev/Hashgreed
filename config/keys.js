require('dotenv').config()
const NodeUrls = {
  'testnet': 'https://testnet.wavesplatform.com',
  'prod': 'https://nodes.wavesplatform.com'
}
const ChainIDs = {
  'testnet': 'T',
  'prod': 'W'
}
const platform = process.env.REACT_APP_WAVES_PLATFORM
module.exports = {
  nodeUrl: NodeUrls[platform],
  chainID: ChainIDs[platform],
  mongoURI: process.env.MONGO_URI,
  smartContract: process.env.REACT_APP_SMART_CONTRACT,
  baseUrl: process.env.REACT_APP_BASE_URL,
}