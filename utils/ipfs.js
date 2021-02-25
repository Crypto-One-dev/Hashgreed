const IpfsHttpClient = require('ipfs-http-client');
const { globSource } = IpfsHttpClient;
const ipfs = IpfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

const uploadOnIPFS = async (path) => {
  try {
    const file = await ipfs.add(globSource(path))
    return file.cid.toString()
  } catch(e) {
    console.error(e)
    return null
  }
}

module.exports = {
  uploadOnIPFS,
}