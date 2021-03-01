import axios from 'axios';

import WavesConfig from 'config/waves';
import AlertUtils from 'utils/alert'

const getPrice = (token, type, callback) => {
  axios
    .get('https://marketdata.wavesplatform.com/api/candles/' + token + '/' + WavesConfig.USDN_ID + '/1440/1')
    .then(res => {
      try {
        if(callback)
          callback(type, parseFloat(res.data[0].vwap))
      } catch(err) {
        console.error(err)
      }
    })
}

const getTransactions = async (address, callback) => {
  try {
    const send = await axios.get(WavesConfig.API_URL + '/v0/transactions/transfer?limit=100&sender=' + address + '&assetId=' + WavesConfig.RKMT_ID)
    const receive = await axios.get(WavesConfig.API_URL + '/v0/transactions/transfer?limit=100&recipient=' + address + '&assetId=' + WavesConfig.RKMT_ID)

    let transfers = [...send.data.data, ...receive.data.data]
    transfers = transfers.sort((l, r) => l.data.height > r.data.height)
    if(callback)
      callback(transfers)
  } catch(e) {
    console.error(e)
  }
}

const getReceiveTransactions = async (address, callback) => {
  try {
    const receive = await axios.get(WavesConfig.API_URL + '/v0/transactions/transfer?limit=100&recipient=' + address + '&assetId=' + WavesConfig.RKMT_ID)
    if(callback)
      callback(receive.data.data)
  } catch(e) {
    console.error(e)
  }
}

const getSendTransactions = async (address, callback) => {
  try {
    const send = await axios.get(WavesConfig.API_URL + '/v0/transactions/transfer?limit=100&sender=' + address + '&assetId=' + WavesConfig.RKMT_ID)
    if(callback)
      callback(send.data.data)
  } catch(e) {
    console.error(e)
  }
}

const getMassTransactions = async (address, callback) => {
  try {
    const mass = await axios.get(WavesConfig.API_URL + '/v0/transactions/mass-transfer?limit=100&sender=' + address + '&assetId=' + WavesConfig.RKMT_ID)
    if(callback)
      callback(mass.data.data)
  } catch(e) {
    console.error(e)
  }
}

const getCertifications = async (address, filter, callback) => {
  try {
    axios
      .post('/api/certifications/getCertifications', {address, filter})
      .then(res => {
        if(callback)
          callback(res.data)
      })
  } catch(e) {
    console.error(e)
  }
}

const searchCertification = async (transactionID, hashID, reference, callback) => {
  try {
    axios
      .post('/api/certifications/searchCertification', {transactionID, hashID, reference})
      .then(res => {
        if(callback)
          callback(res.data)
      })
  } catch(e) {
    console.error(e)
  }
}

const fileUpload = async (file, txid) => {
  try {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('txid', txid)
    const status = await axios.post('/api/upload/file', formData, {headers:{'content-type':'multipart/form-data'}})
    if(status !== 'Success')
      AlertUtils.SystemAlert(status)
  } catch(e) {
    console.error(e)
    AlertUtils.SystemAlert(e)
  }
}

const ApiUtils = {
  getPrice,
  getTransactions,
  getReceiveTransactions,
  getSendTransactions,
  getMassTransactions,
  getCertifications,
  searchCertification,
  fileUpload,
}

export default ApiUtils