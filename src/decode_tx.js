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
const d_tx = txDecoder.decodeTx('0xf8ae83050b9c8502540be4008307a120941162e2efce13f99ed259ffc24d99108aaa0ce93580b844a9059cbb00000000000000000000000092e321367bdf57903ce92e286f621857a5839c44000000000000000000000000000000000000000000000000069789fbbc4f80008194a0cde6ed9223b44b0f811ae39f0fdd387e9aa596d73fa9028b72f22cacde1938f5a01a6ed590d39b4fff55d9a684ab5ea6ee8598aaa06eb4e3fc6b47e5d9898f1b58')

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