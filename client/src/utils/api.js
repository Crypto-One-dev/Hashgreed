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
    const files = await axios.post('/api/certifications/getCertifications', {filter: 'data_fc_([A-Za-z0-9]*)_' + address})
    const emails = await axios.post('/api/certifications/getCertifications', {filter: 'data_ec_([A-Za-z0-9]*)_' + address})
    const mutuals = await getMutualCertifications(address)
    let certTmp = [...files.data, ...emails.data, ...mutuals], certArray = []
    certTmp.forEach(cert => {
      cert.timestamp = new Date(cert.timestamp).toISOString()
      const split = cert.key.split('_')
      cert.type = split[1]
      cert.id = split[2]
      cert.publisher = split[3]
      certArray.push({
        __type: 'certification',
        data: cert
      })
    })

    let transfers = [...send.data.data, ...receive.data.data, ...certArray]
    transfers = transfers.sort((l, r) => {
      if(l.data.timestamp > r.data.timestamp)
        return -1
      if(l.data.timestamp > r.data.timestamp)
        return 1
      return 0
    })
    if(callback)
      callback(transfers)
  } catch(e) {
    console.error(e)
  }
}

const getMutualCertifications = async (address, callback) => {
  try {
    const inactive = await axios.post('/api/certifications/filterCertifications', {filter: address + '_MA_([A-Za-z0-9]*)'})
    let mutuals = []
    for(const key in inactive.data) {
      const split = key.split('_')
      const origin = await axios.post('/api/certifications/getCertifications', {filter: 'data_MA_' + split[2] + '_([A-Za-z0-9]*)'})
      mutuals = mutuals.concat(origin.data)
    }
    mutuals = mutuals.sort((l, r) => {
      if(l.timestamp > r.timestamp)
        return -1
      if(l.timestamp > r.timestamp)
        return 1
      return 0
    })
    if(callback) {
      callback(mutuals)
    }
    return mutuals
  } catch(e) {
    console.error(e)
    return []
  }
}

const getCounterparts = async (txid, callback) => {
  try {
    const counterparts = await axios.post('/api/certifications/filterCertifications', {filter: '([A-Za-z0-9]*)_MA_' + txid})
    let result = []
    for(const key in counterparts.data) {
      let tmp = counterparts.data[key]
      const split = key.split('_')
      tmp.address = split[0]
      tmp.status = tmp.value.replace('SIGNED_', '')
      result.push(tmp)
    }
    if(callback)
      callback(result)
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

const getCertifications = async (filter, callback) => {
  try {
    axios
      .post('/api/certifications/getCertifications', {filter})
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

const emailUpload = async (file, smtp, server, port, login, password, first_name, last_name, email_sender, email_recipient, message, reference, messageid, txid) => {
  try {
    const formData = new FormData();
    if(file)
      formData.append('attachment', file)
    formData.append('smtp', smtp)
    formData.append('server', server)
    formData.append('port', port)
    formData.append('login', login)
    formData.append('password', password)
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    formData.append('email_sender', email_sender)
    formData.append('email_recipient', email_recipient)
    formData.append('message', message)
    formData.append('reference', reference)
    formData.append('messageid', messageid)
    formData.append('txid', txid)
    const status = await axios.post('/api/upload/email', formData, {headers:{'content-type':'multipart/form-data'}})
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
  getMutualCertifications,
  getCounterparts,
  getCertifications,
  searchCertification,
  fileUpload,
  emailUpload,
}

export default ApiUtils