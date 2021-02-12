import axios from 'axios';
import WavesConfig from 'config/waves'

const getPrice = (key, type, callback) => {
  axios
    .get('https://api.coingecko.com/api/v3/coins/' + key)
    .then(res => {
      try {
        if(callback)
          callback(type, res.data.market_data.current_price.usd)
      } catch(err) {
        console.error(err)
      }
    })
}

const getTransactions = async (address, callback) => {
  try {
    const send = await axios.get(WavesConfig.API_URL + '/v0/transactions/transfer?limit=100&sender=' + address + '&assetId=' + WavesConfig.TOKEN_ID)
    const receive = await axios.get(WavesConfig.API_URL + '/v0/transactions/transfer?limit=100&recipient=' + address + '&assetId=' + WavesConfig.TOKEN_ID)

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
    const receive = await axios.get(WavesConfig.API_URL + '/v0/transactions/transfer?limit=100&recipient=' + address + '&assetId=' + WavesConfig.TOKEN_ID)
    if(callback)
      callback(receive.data.data)
  } catch(e) {
    console.error(e)
  }
}

const ApiUtils = {
  getPrice,
  getTransactions,
  getReceiveTransactions,
}

export default ApiUtils