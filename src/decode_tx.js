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
const d_tx = txDecoder.decodeTx('0xf8ab808534630b8a00830249f0944f3e28f36708866d047dd63fa0c995d93e3c8e1d80b844a9059cbb000000000000000000000000ae910435273512e07b9e7cd6d8b03278bdefee6a0000000000000000000000000000000000000000000000000057b76c978120008188a0957cdb1244d04d1b70f4045ef7075f2a913ebff0d7624c0c6af3e65b9b0051e4a05446ec41b225d3aba8ea10cd22737bebbc31e7248ccb28f325c24376762d881b')

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