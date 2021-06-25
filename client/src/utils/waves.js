import { Signer } from '@waves/signer'
import { ProviderCloud } from '@waves.exchange/provider-cloud'
import { ProviderWeb } from '@waves.exchange/provider-web'
import { base58Encode, stringToBytes } from '@waves/ts-lib-crypto'
import { nodeInteraction } from '@waves/waves-transactions'

import WavesConfig from 'config/waves'
import AlertUtils from 'utils/alert'
import ApiUtils from 'utils/api'

const unlockWallet = async (link, callback, error_callback) => {
  try {
    window.waves = new Signer({ NODE_URL: WavesConfig.NODE_URL })
    const provider = link === 'SEED' ? new ProviderWeb() : new ProviderCloud()
    window.waves.setProvider(provider)
    const user = await window.waves.login()
    if (callback) {
      callback(user.address, user.publicKey)
    }
  } catch (e) {
    if (error_callback) {
      error_callback()
    }
    console.error(e)
  }
}
const getBalance = async (callback, error_callback) => {
  try {
    if (window.waves) {
      const balances = await window.waves.getBalance()
      var rkmt_balance = 0, hash_balance = 0, usdt_balance = 0, waves_balance = 0
      balances.forEach(item => {
        if (item.assetId === WavesConfig.RKMT_ID) {
          rkmt_balance = item.amount / (10 ** WavesConfig.RKMT_DECIMALS)
        }
        if (item.assetId === WavesConfig.HASH_ID) {
          hash_balance = item.amount / (10 ** WavesConfig.HASH_DECIMALS)
        }
        if (item.assetId === WavesConfig.USDT_ID) {
          usdt_balance = item.amount / (10 ** WavesConfig.USDT_DECIMALS)
        }
        if (item.assetId === WavesConfig.WAVES_ID) {
          waves_balance = item.amount / (10 ** WavesConfig.WAVES_DECIMALS)
        }
      })
      if (callback) {
        callback(rkmt_balance, hash_balance, usdt_balance, waves_balance)
      }
    }
  } catch (e) {
    console.error(e)
  }
}
const send = async (recipient, amount, comment) => {
  try {
    if (window.waves) {
      let transfer = {
        recipient: recipient,
        amount: amount * (10 ** WavesConfig.RKMT_DECIMALS),
        assetId: WavesConfig.RKMT_ID,
      }
      if (comment) {
        transfer.attachment = base58Encode(stringToBytes(comment))
      }
      await window.waves.transfer(transfer).broadcast()
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
}
const masssend = async (recipients, comment) => {
  try {
    if (window.waves) {
      let massTransfer = {
        transfers: [],
        assetId: WavesConfig.RKMT_ID,
        fee: 0.001 * recipients.length * (10 ** WavesConfig.WAVES_DECIMALS),
      }
      recipients.forEach(recipient => {
        massTransfer.transfers.push({
          recipient: recipient.address,
          amount: recipient.amount * (10 ** WavesConfig.RKMT_DECIMALS),
        })
      })
      if (comment) {
        massTransfer.attachment = base58Encode(stringToBytes(comment))
      }
      await window.waves.massTransfer(massTransfer).broadcast()
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
}

const CertifyFile = async (reference, hash, uuid, timestamp, publicKey, certFee, transactionFee) => {
  try {
    if (window.waves) {
      const tx = await window.waves.invoke({
        dApp: WavesConfig.SMART_CONTRACT,
        payment: [{
          assetId: WavesConfig.RKMT_ID,
          amount: certFee * (10 ** WavesConfig.RKMT_DECIMALS)
        }],
        fee: transactionFee * (10 ** WavesConfig.WAVES_DECIMALS),
        call: {
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
      return tx
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
  return null
}

const RevokeCertificate = async (txid, publicKey, certFee, transactionFee) => {
  try {
    if (window.waves) {
      await window.waves.invoke({
        dApp: WavesConfig.SMART_CONTRACT,
        payment: [{
          assetId: WavesConfig.RKMT_ID,
          amount: certFee * (10 ** WavesConfig.RKMT_DECIMALS)
        }],
        fee: transactionFee * (10 ** WavesConfig.WAVES_DECIMALS),
        call: {
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
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
}

const CertifyEmail = async (reference, uuid, domain, timestamp, publicKey, certFee, transactionFee) => {
  try {
    if (window.waves) {
      let json = {
        messageid: uuid + '@' + domain,
        timestamp: timestamp,
        reference: reference
      }
      const tx = await window.waves.invoke({
        dApp: WavesConfig.SMART_CONTRACT,
        payment: [{
          assetId: WavesConfig.RKMT_ID,
          amount: certFee * (10 ** WavesConfig.RKMT_DECIMALS)
        }],
        fee: transactionFee * (10 ** WavesConfig.WAVES_DECIMALS),
        call: {
          function: 'emailCertification',
          args: [
            {
              'type': 'string',
              'value': domain
            },
            {
              'type': 'string',
              'value': reference
            },
            {
              'type': 'string',
              'value': uuid
            },
            {
              "type": "string",
              "value": JSON.stringify(json)
            },
            {
              "type": "string",
              "value": publicKey
            },
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
      return tx
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
  return null
}

const CertifyMutual = async (reference, hash, recp, uuid, timestamp, publicKey, certFee, transactionFee) => {
  try {
    if (window.waves) {
      let json = {
        title: reference,
        timestamp: timestamp,
        hash: hash,
        creator: ''
      }
      recp.forEach((rec, index) => {
        json['address' + (index + 1)] = rec
      })
      const tx = await window.waves.invoke({
        dApp: WavesConfig.SMART_CONTRACT,
        payment: [{
          assetId: WavesConfig.RKMT_ID,
          amount: certFee * (10 ** WavesConfig.RKMT_DECIMALS)
        }],
        fee: Math.round(transactionFee * (10 ** WavesConfig.WAVES_DECIMALS)),
        call: {
          function: 'createAgreement',
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
              "value": JSON.stringify(json)
            },
            {
              "type": "string",
              "value": recp.join(',')
            },
            {
              "type": "string",
              "value": publicKey
            },
            {
              "type": "string",
              "value": uuid
            },
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
      return tx
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
  return null
}

const SignMutual = async (hash, agreementId, publicKey) => {
  try {
    if (window.waves) {
      const tx = await window.waves.invoke({
        dApp: WavesConfig.SMART_CONTRACT,
        call: {
          function: 'signAgreement',
          args: [
            {
              "type": "string",
              "value": hash
            },
            {
              "type": "string",
              "value": agreementId
            },
            {
              "type": "string",
              "value": publicKey
            },
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
      return tx
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
  return null
}

const DepositRKMT = async (amount) => {
  try {
    if (window.waves) {
      await window.waves.invoke({
        dApp: WavesConfig.STAKE_SCRIPT,
        payment: [{
          assetId: WavesConfig.RKMT_ID,
          amount: amount * (10 ** WavesConfig.RKMT_DECIMALS)
        }],
        call: {
          function: 'depositRKMT',
          args: []
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
}

const WithdrawRKMT = async (amount) => {
  try {
    if (window.waves) {
      await window.waves.invoke({
        dApp: WavesConfig.STAKE_SCRIPT,
        call: {
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
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
}

const StakedRKMT = async (address, callback) => {
  try {
    var data = await nodeInteraction.accountData(WavesConfig.STAKE_SCRIPT, WavesConfig.NODE_URL)
    if (address in data && callback)
      callback(data[address].value / (10 ** WavesConfig.RKMT_DECIMALS))
    console.log(data)
  } catch (e) {
    console.error(e)
  }
}

const StartAuction = async (duration, startingPrice, priceAssetID, nftAssetID, nftAssetAmount) => {
  try {
    if (window.waves) {
      const price_decimals = await ApiUtils.getAssetDecimals(priceAssetID)
      const nft_decimals = await ApiUtils.getAssetDecimals(nftAssetID)
      const tx = await window.waves.invoke({
        dApp: WavesConfig.NFT_SCRIPT,
        payment: [{
          assetId: nftAssetID,
          amount: nftAssetAmount * (10 ** nft_decimals)
        }],
        call: {
          function: 'startAuction',
          args: [
            {
              "type": "integer",
              "value": duration
            },
            {
              "type": "integer",
              "value": startingPrice * (10 ** price_decimals)
            },
            {
              "type": "string",
              "value": priceAssetID
            }
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
      return tx
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
  return null
}

const WithdrawAuction = async (auctionID) => {
  try {
    if (window.waves) {
      await window.waves.invoke({
        dApp: WavesConfig.NFT_SCRIPT,
        call: {
          function: 'withdraw',
          args: [
            {
              "type": "string",
              "value": auctionID
            }
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
}

const BidAuction = async (auctionID, bidAmount, bidAssetID) => {
  try {
    if (window.waves) {
      const bid_decimals = await ApiUtils.getAssetDecimals(bidAssetID)
      await window.waves.invoke({
        dApp: WavesConfig.NFT_SCRIPT,
        payment: [{
          assetId: bidAssetID,
          amount: bidAmount * (10 ** bid_decimals)
        }],
        call: {
          function: 'bid',
          args: [
            {
              "type": "string",
              "value": auctionID
            }
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
}

const CreateLoan = async (days,amount) => {
  try {
    if (window.waves) {
      const tx = await window.waves.invoke({
        dApp: WavesConfig.LOAN_SCRIPT,
        payment: [{
          assetId: WavesConfig.WAVES_ID,
          amount: amount * (10 ** WavesConfig.WAVES_DECIMALS)
        }],
        call: {
          function: 'RequestLoan',
          args: [
            {
              "type": "integer",
              "value": days
            }
          ]
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
      return tx
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
  return null
}

const RepayLoan = async (assetId, amount) => {
  const decimals = await ApiUtils.getAssetDecimals(assetId)
  try {
    if (window.waves) {
      const tx = await window.waves.invoke({
        dApp: WavesConfig.LOAN_SCRIPT,
        payment: [{
          assetId: assetId,
          amount: amount * (10 ** decimals)
        }],
        call: {
          function: 'RepayLoan',
          args: []
        },
        chainId: WavesConfig.CHAIN_ID
      }).broadcast()
      return tx
    }
  } catch (e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
  return null
}

const WavesUtils = {
  unlockWallet,
  getBalance,
  send,
  masssend,
  CertifyFile,
  RevokeCertificate,
  CertifyEmail,
  CertifyMutual,
  SignMutual,
  DepositRKMT,
  WithdrawRKMT,
  StakedRKMT,
  StartAuction,
  WithdrawAuction,
  BidAuction,
  CreateLoan,
  RepayLoan,
}
export default WavesUtils