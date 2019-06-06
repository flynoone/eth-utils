/**
 * 文档： https://github.com/satoshilabs/slips/blob/master/slip-0039.md#motivation
 *       https://www.jianshu.com/p/9c5af78453f4
 * NPM: https://www.npmjs.com/package/bip39
 * 
 * https://github.com/ConsenSys/eth-lightwallet
 */

const bip39 = require('bip39')
const crypto = require("crypto")

// nurse equip pink inside glory travel sell soup often whip stock vital
// const mnemonic = bip39.generateMnemonic()
const mnemonic = bip39.generateMnemonic(128, crypto.randomBytes, bip39.wordlists.JA)
console.log('mnic: ', mnemonic)

// pbkdf2(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512')
const seed = bip39.mnemonicToSeed(mnemonic, '123')
console.log('seed: ', seed.toString('hex'))
// 09733578dbc90d393c24955f3b9d44f4ae27ce3f63fbe022667c90dbd25099747d78f9c03e53b727c04062dde9cdc802aa226ef91111a7b94253a301b8ef2e83

const mnemonic2 = bip39.mnemonicToSeedHex('coyote gun urban faculty poet apart mobile pluck remember human metal welcome')
console.log('seed, ', mnemonic2)

// 7cd718e46af80d271d18188b992d7b9d56a56c92d65c45dcf0c5401466012a1d