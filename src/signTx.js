const EthereumTx = require('ethereumjs-tx')

const privateKey = Buffer.from('adc67fa4735d355ccd2e567e80c525db380990f65953929d5e42b803e108b13d', 'hex')

const txParams = {
  nonce: 11,
  gasPrice: 10000000000000, 
  gasLimit: 21000,
  to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602', 
  value: '0x11', 
  data: '0x',
  // EIP 155 chainId - mainnet: 1, ropsten: 3
  chainId: 3
}

const tx = new EthereumTx(txParams)
tx.sign(privateKey)
const serializedTx = tx.serialize()

console.log('raw: ', serializedTx.toString('hex'))


