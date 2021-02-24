const {
  REACT_APP_WAVES_PLATFORM,
  REACT_APP_HASH_ASSET_ID,
  REACT_APP_HASH_ASSET_DECIMALS,
  REACT_APP_RKMT_ASSET_ID,
  REACT_APP_RKMT_ASSET_DECIMALS,
  REACT_APP_USDT_ASSET_ID,
  REACT_APP_USDT_ASSET_DECIMALS,
  REACT_APP_SMART_CONTRACT,
  REACT_APP_BASE_URL,
} = process.env

const WAVES_ASSET_ID = "WAVES"
const WAVES_DECIMALS = 8

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
  'testnet': 'T',
  'prod': 'W'
}
const AccountUrls = {
  'testnet': 'https://testnet.waves.exchange/sign-in',
  'prod': 'https://waves.exchange/sign-in'
}

const config = {
  WAVES_PLATFORM: REACT_APP_WAVES_PLATFORM,
  NODE_URL: NodeUrls[REACT_APP_WAVES_PLATFORM],
  SEED_PROVIDER_URL: SeedProviderUrls[REACT_APP_WAVES_PLATFORM],
  CLOUD_PROVIDER_URL: CloudProviderUrls[REACT_APP_WAVES_PLATFORM],
  EXPLORER_URL: explorerUrls[REACT_APP_WAVES_PLATFORM],
  API_URL: apiUrls[REACT_APP_WAVES_PLATFORM],
  HASH_ID: REACT_APP_HASH_ASSET_ID,
  HASH_DECIMALS: parseInt(REACT_APP_HASH_ASSET_DECIMALS),
  RKMT_ID: REACT_APP_RKMT_ASSET_ID,
  RKMT_DECIMALS: parseInt(REACT_APP_RKMT_ASSET_DECIMALS),
  USDT_ID: REACT_APP_USDT_ASSET_ID,
  USDT_DECIMALS: parseInt(REACT_APP_USDT_ASSET_DECIMALS),
  WAVES_ID: WAVES_ASSET_ID,
  WAVES_DECIMALS: WAVES_DECIMALS,
  USDN_ID: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p',
  CHAIN_ID: ChainIDs[REACT_APP_WAVES_PLATFORM],
  ACCOUNT_URL: AccountUrls[REACT_APP_WAVES_PLATFORM],
  SMART_CONTRACT: REACT_APP_SMART_CONTRACT,
  BASE_URL: REACT_APP_BASE_URL,
}

export default config