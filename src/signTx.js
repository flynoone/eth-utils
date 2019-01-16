const EthereumTx = require('ethereumjs-tx')

const privateKey = Buffer.from('adc67fa4735d355ccd2e567e80c525db380990f65953929d5e42b803e108b13d', 'hex')

const txParams = {
  nonce: 23,
  gasPrice: 1000000000, 
  gasLimit: 36703,
  to: '0xa32cd4dda362d37d058cda4d17ce2734f33b753b', 
  value: '0x6f05b59d3b20000', 
  data: '0x', 
  // EIP 155 chainId - mainnet: 1, ropsten: 3
  chainId: 3
}

const tx = new EthereumTx(txParams)
tx.sign(privateKey)
const serializedTx = tx.serialize()

console.log('raw: ', serializedTx.toString('hex'))


