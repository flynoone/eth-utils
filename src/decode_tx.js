/*
 * @Author: your name
 * @Date: 2021-05-17 10:48:29
 * @LastEditTime: 2021-07-16 09:56:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /eth-web3-utils/src/decode_tx.js
 */
const txDecoder = require('ethereum-tx-decoder');
(() => {
  const raws = [
    "0xf86c80850392f1458182c35094bc1d00f2659cf0eb84f0e6eb4c25c04512ecb84787271471148780008081eca043a51202f8653019d5eed8b7eab80452047d738a953ca6a88d60a7339b221e11a00a84752ebd6262f6b61d6e77958d1ea56fb9ffcecbc62d31ae52b4e226c3b633"
  ]
  raws.forEach(raw => {
    const d_tx = txDecoder.decodeTx(raw)  

    console.log(d_tx['nonce'])
  });

})()
/**
 * Decode ethereum signed raw data
 */


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