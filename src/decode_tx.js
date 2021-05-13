const txDecoder = require('ethereum-tx-decoder');

/**
 * Decode ethereum signed raw data
 */
const d_tx = txDecoder.decodeTx('0xf86f8303fc7b8547036aaa00829c4094d784817ac75b0ba5592d7e29dc03cdd883c07e70880d99a8cec7e20000801ba046277fae9bdb4459c21a749962ae0c12f7f948a0dfbe9670ac4d00c2c60ad377a077a711c22dae4d4c75939892573d548dac259ef28d644ce9a2bd1179bcc8f104')

console.log(d_tx)

/**
{ nonce: 261243,
  gasPrice: BigNumber { _hex: '0x47036aaa00' },
  gasLimit: BigNumber { _hex: '0x9c40' },
  to: '0xd784817ac75b0ba5592d7e29dc03cdd883c07e70',
  value: BigNumber { _hex: '0x0d99a8cec7e20000' },
  data: '0x',
  v: 27,
  r:
   '0x46277fae9bdb4459c21a749962ae0c12f7f948a0dfbe9670ac4d00c2c60ad377',
  s:
   '0x77a711c22dae4d4c75939892573d548dac259ef28d644ce9a2bd1179bcc8f104' }
 */