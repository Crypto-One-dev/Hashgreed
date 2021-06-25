require('dotenv').config()
const NodeUrls = {
  'testnet': 'https://testnet.wavesplatform.com',
  'prod': 'https://nodes.wavesplatform.com'
}
const ChainIDs = {
  'testnet': 84,
  'prod': 87
}
const platform = 'prod'
module.exports = {
  nodeUrl: NodeUrls[platform],
  chainID: ChainIDs[platform],
  smartContract: '3P7JCNf1Z8uPWaNayLg2hTrhgLktDxgfXmm',
  nftContract: '3PJKkEKwuySZDAzFvNouVA5Ke2uLsyx5bAe',
  stakeContract: '3P5fYAZWS8P7vKHgs4KD82RzhBTdt53c8Db',
  loanContract: '3P32KGEZqhNghPFjTPztpJMMWLcpiZJPwdP',
  sportContract: '3P9c6g3Gf9dukaBYfwecszX3Ctdwch467tk',
  baseUrl: process.env.REACT_APP_BASE_URL,
  mongoURI: process.env.MONGO_URI,
  sendBlue: {
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    login: process.env.SENDINBLUE_LOGIN,
    passw: process.env.SENDINBLUE_PASSW,
  },
  pinata: {
    api: process.env.PINATA_API,
    secret: process.env.PINATA_SECRET,
  },
}