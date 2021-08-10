/*
 * @Author: your name
 * @Date: 2021-05-17 10:48:29
 * @LastEditTime: 2021-07-16 09:56:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /eth-web3-utils/src/decode_tx.js
 */
const txDecoder = require('ethereum-tx-decoder');

/**
 * Decode ethereum signed raw data
 */
const d_tx = txDecoder.decodeTx('0xf8628080825208941c5b0e12e90e9c52235babad76cfccab2519bb958080830150efa0308ca8002f3df1a468eea9973d2d618eb866e2ef0a57cba4d34efb3025b70a0aa0592b7b0a803e7b70ec26dd74ab85aa71126198eff5552e5be638e6e26a455ee0')

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