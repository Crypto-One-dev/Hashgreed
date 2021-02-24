import {Signer} from '@waves/signer'
import Provider from '@waves.exchange/provider-web'
import {base58Encode, stringToBytes} from '@waves/ts-lib-crypto'

import WavesConfig from 'config/waves'

const showAlert = (e) => {
  if(typeof e === 'string') {
    alert(e)
  } else if(typeof e === 'object' && e.message) {
    alert(e.message)
  }
}

const unlockWallet = async (link, callback, error_callback) => {
  try {
    window.waves = new Signer({NODE_URL: WavesConfig.NODE_URL})
    const provider = new Provider(link === 'SEED' ? WavesConfig.SEED_PROVIDER_URL : WavesConfig.CLOUD_PROVIDER_URL)
    window.waves.setProvider(provider)
    const user = await window.waves.login()
    console.log(user)
    if(callback) {
      callback(user.address, user.publicKey)
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
      var rkmt_balance = 0, hash_balance = 0, usdt_balance = 0, waves_balance = 0
      balances.forEach(item => {
        if(item.assetId === WavesConfig.RKMT_ID) {
          rkmt_balance = item.amount / (10 ** WavesConfig.RKMT_DECIMALS)
        }
        if(item.assetId === WavesConfig.HASH_ID) {
          hash_balance = item.amount / (10 ** WavesConfig.HASH_DECIMALS)
        }
        if(item.assetId === WavesConfig.USDT_ID) {
          usdt_balance = item.amount / (10 ** WavesConfig.USDT_DECIMALS)
        }
        if(item.assetId === WavesConfig.WAVES_ID) {
          waves_balance = item.amount / (10 ** WavesConfig.WAVES_DECIMALS)
        }
      })
      if(callback) {
        callback(rkmt_balance, hash_balance, usdt_balance, waves_balance)
      }
    }
  } catch(e) {
    console.error(e)
  }
}
const send = async (recipient, amount, comment) => {
  try {
    if(window.waves) {
      let transfer = {
        recipient: recipient,
        amount: amount * (10 ** WavesConfig.RKMT_DECIMALS),
        assetId: WavesConfig.RKMT_ID,
      }
      if(comment) {
        transfer.attachment = base58Encode(stringToBytes(comment))
      }
      await window.waves.transfer(transfer).broadcast()
    }
  } catch(e) {
    console.error(e)
    showAlert(e)
  }
}
const masssend = async (recipients, comment) => {
  try {
    if(window.waves) {
      let massTransfer = {
        transfers: [],
        assetId: WavesConfig.RKMT_ID,
        fee: 0.002 * (10 ** WavesConfig.WAVES_DECIMALS),
      }
      recipients.forEach(recipient => {
        massTransfer.transfers.push({
          recipient: recipient.address,
          amount: recipient.amount * (10 ** WavesConfig.RKMT_DECIMALS),
       })
      })
      if(comment) {
        massTransfer.attachment = base58Encode(stringToBytes(comment))
      }
      await window.waves.massTransfer(massTransfer).broadcast()
    }
  } catch(e) {
    console.error(e)
    showAlert(e)
  }
}

const CertifyFile = async (reference, hash, uuid, timestamp, publicKey, certFee, transactionFee) => {
  try {
    if(window.waves) {
      await window.waves.invoke({
        dApp: WavesConfig.SMART_CONTRACT,
        payment: [{
          assetId: WavesConfig.RKMT_ID,
          amount: certFee * (10 ** WavesConfig.RKMT_DECIMALS)
        }],
        fee: transactionFee * (10 ** WavesConfig.WAVES_DECIMALS),
        call:{
          function: 'fileCertification',
          args: [
            {
              "type": "string",
              "value": hash
            },
            {
              "type": "string",
              "value": reference
            },
            {
              "type": "string",
              "value": uuid
            },
            {
              "type": "string",
              "value": JSON.stringify({
                hash: hash,
                timestamp: timestamp,
                title: reference
              })
            },
            {
              "type": "string",
              "value": publicKey
            },
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
    }
  } catch(e) {
    console.error(e)
    showAlert(e)
  }
}

const RevokeCertificate = async (txid, publicKey, certFee, transactionFee) => {
  try {
    if(window.waves) {
      await window.waves.invoke({
        dApp: WavesConfig.SMART_CONTRACT,
        payment: [{
          assetId: WavesConfig.RKMT_ID,
          amount: certFee * (10 ** WavesConfig.RKMT_DECIMALS)
        }],
        fee: transactionFee * (10 ** WavesConfig.WAVES_DECIMALS),
        call:{
          function: 'revokeCertification',
          args: [
            {
              "type": "string",
              "value": txid
            },
            {
              "type": "string",
              "value": publicKey
            },
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
    }
  } catch(e) {
    console.error(e)
    showAlert(e)
  }
}

const DepositRKMT = async (amount) => {
  try {
    if(window.waves) {
      await window.waves.invoke({
        dApp: WavesConfig.STAKE_SCRIPT,
        payment: [{
          assetId: WavesConfig.RKMT_ID,
          amount: amount * (10 ** WavesConfig.RKMT_DECIMALS)
        }],
        call:{
          function: 'depositRKMT',
          args: []
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
    }
  } catch(e) {
    console.error(e)
    showAlert(e)
  }
}

const WithdrawRKMT = async (amount) => {
  try {
    if(window.waves) {
      await window.waves.invoke({
        dApp: WavesConfig.STAKE_SCRIPT,
        call:{
          function: 'withdrawRKMT',
          args: [
            {
              "type": "integer",
              "value": amount
            }
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
    }
  } catch(e) {
    console.error(e)
    showAlert(e)
  }
}

const WavesUtils = {
  unlockWallet,
  getBalance,
  send,
  masssend,
  CertifyFile,
  RevokeCertificate,
  DepositRKMT,
  WithdrawRKMT,
}
export default WavesUtils;