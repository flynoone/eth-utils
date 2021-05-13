const EthereumTx = require('ethereumjs-tx')
const {getTransactionCount} = require('./rpc')

const account = '0xf8dc84221c12d73918f4610064A7E0f00C869613'

getTransactionCount(account).then(r => {
    console.log('nonce: ', parseInt(r, 'hex'))
 }).catch(err => {
      return console.log('nonce err: '. err.toString())
  })

const privateKey = Buffer.from('adc67fa4735d355ccd2e567e80c525db380990f65953929d5e42b803e108b13d', 'hex')

const txParams = {
  nonce: 43,
  gasPrice: 1000000000, 
  gasLimit: 36703,
  to: '0xa32cd4dda362d37d058cda4d17ce2734f33b753b', 
  value: '0x11c37937e08000', 
  data: '0x', 
  // EIP 155 chainId - mainnet: 1, ropsten: 3
  chainId: 3
}

const tx = new EthereumTx(txParams)
tx.sign(privateKey)
const serializedTx = tx.serialize()

const raw_tx = new EthereumTx(serializedTx.toString('hex'))
console.log(raw_tx.)
console.log('raw: ', serializedTx.toString('hex'))
