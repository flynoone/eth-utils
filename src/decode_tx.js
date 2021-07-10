const txDecoder = require('ethereum-tx-decoder');

/**
 * Decode ethereum signed raw data
 */
const d_tx = txDecoder.decodeTx('0x02f86b03320181ff8307a120946ea462e163adb78cafa6b57c5680ab8689a3f19387134a8e6521600080c080a0326c8bc1f0c00716a570a31666ea05c72fbc329abc84bde5a13412fa62c24531a023965362da7cb97fb759bd0060c1b721d2cb47098ed8e11faf15a0209f6fb5cb')

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