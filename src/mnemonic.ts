/**
 * 文档： https://github.com/satoshilabs/slips/blob/master/slip-0039.md#motivation
 *       https://www.jianshu.com/p/9c5af78453f4
 * NPM: https://www.npmjs.com/package/bip39
 * 
 * https://github.com/ConsenSys/eth-lightwallet
 */

const bip39 = require('bip39')

const mnemonic = bip39.generateMnemonic()
console.log('mnic: ', mnemonic)