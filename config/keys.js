require('dotenv').config()
const NodeUrls = {
  'testnet': 'https://testnet.wavesplatform.com',
  'prod': 'https://nodes.wavesplatform.com'
}
const ChainIDs = {
  'testnet': 'T',
  'prod': 'W'
}
const platform = 'prod'
module.exports = {
  nodeUrl: NodeUrls[platform],
  chainID: ChainIDs[platform],
  smartContract: '3PG8noVrXvBH7VTzgjsQyzPiAtfoXxHqRbX',
  baseUrl: process.env.REACT_APP_BASE_URL,
  mongoURI: process.env.MONGO_URI,
}