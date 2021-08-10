const {
  REACT_APP_BASE_URL,
} = process.env

const platform = 'prod'
const NodeUrls = {
  'testnet': 'https://testnet.wavesplatform.com',
  'prod': 'https://nodes.wavesplatform.com'
}
const SeedProviderUrls = {
  'testnet': 'https://testnet.waves.exchange/signer/',
  'prod': 'https://waves.exchange/signer/'
}
const CloudProviderUrls = {
  'testnet': 'https://testnet.waves.exchange/signer-cloud/',
  'prod': 'https://waves.exchange/signer-cloud/'
}
const explorerUrls = {
  'testnet': 'https://testnet.wavesexplorer.com',
  'prod': 'https://wavesexplorer.com'
}
const apiUrls = {
  'testnet': 'https://api.testnet.wavesplatform.com',
  'prod': 'https://api.wavesplatform.com'
}
const ChainIDs = {
  'testnet': 84,
  'prod': 87
}
const AccountUrls = {
  'testnet': 'https://testnet.waves.exchange/sign-in',
  'prod': 'https://waves.exchange/sign-in'
}

const config = {
  WAVES_PLATFORM: platform,
  NODE_URL: NodeUrls[platform],
  SEED_PROVIDER_URL: SeedProviderUrls[platform],
  CLOUD_PROVIDER_URL: CloudProviderUrls[platform],
  EXPLORER_URL: explorerUrls[platform],
  API_URL: apiUrls[platform],
  WAVES_ID: 'WAVES',
  WAVES_DECIMALS: 8,
  RKMT_ID: '2fCdmsn6maErwtLuzxoUrCBkh2vx5SvXtMKAJtN4YBgd',
  RKMT_DECIMALS: 3,
  HASH_ID: '7RgM3A5AVCUZFbL3EwBicv1eHFCVsaY8z71yda77zrAv',
  HASH_DECIMALS: 8,
  USDT_ID: '34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ',
  USDT_DECIMALS: 6,
  USDN_ID: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p',
  CHAIN_ID: ChainIDs[platform],
  ACCOUNT_URL: AccountUrls[platform],
  BASE_URL: REACT_APP_BASE_URL,
  SMART_CONTRACT: '3P7JCNf1Z8uPWaNayLg2hTrhgLktDxgfXmm',
  STAKE_SCRIPT: '3P5fYAZWS8P7vKHgs4KD82RzhBTdt53c8Db',
  NFT_SCRIPT: '3PJKkEKwuySZDAzFvNouVA5Ke2uLsyx5bAe',
  LOAN_SCRIPT: '3P32KGEZqhNghPFjTPztpJMMWLcpiZJPwdP',
  SPORT_SCRIPT: '3P9c6g3Gf9dukaBYfwecszX3Ctdwch467tk',
  UUID_NAMESPACE: '3874fba0-9bb1-5478-83f9-fec000a97d2a',
}

export default config