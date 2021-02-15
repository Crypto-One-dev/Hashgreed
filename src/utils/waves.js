import {Signer} from '@waves/signer'
import Provider from '@waves.exchange/provider-web'

import WavesConfig from 'config/waves'

const unlockWallet = async (link, callback, error_callback) => {
  try {
    window.waves = new Signer({NODE_URL: WavesConfig.NODE_URL})
    const provider = new Provider(link === 'SEED' ? WavesConfig.SEED_PROVIDER_URL : WavesConfig.CLOUD_PROVIDER_URL)
    window.waves.setProvider(provider)
    const user = await window.waves.login()
    if(callback) {
      callback(user.address)
    }
  } catch(e) {
    if(error_callback) {
      error_callback()
    }
    console.error(e)
  }
}
const getBalance = async (callback, error_callback) => {
  try {
    if(window.waves) {
      const balances = await window.waves.getBalance()
      var rkmt_balance = 0, hash_balance = 0, waves_balance = 0
      balances.forEach(item => {
        if(item.assetId === WavesConfig.RKMT_ID) {
          rkmt_balance = item.amount / (10 ** WavesConfig.RKMT_DECIMALS)
        }
        if(item.assetId === WavesConfig.HASH_ID) {
          hash_balance = item.amount / (10 ** WavesConfig.HASH_DECIMALS)
        }
        if(item.assetId === WavesConfig.WAVES_ID) {
          waves_balance = item.amount / (10 ** WavesConfig.WAVES_DECIMALS)
        }
      })
      if(callback) {
        callback(rkmt_balance, hash_balance, waves_balance)
      }
    }
  } catch(e) {
    if(error_callback) {
      error_callback()
    }
    console.error(e)
  }
}
const WavesUtils = {
  unlockWallet,
  getBalance,
}
export default WavesUtils;