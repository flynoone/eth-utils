/**
 * https://www.npmjs.com/package/ethereum-bip44
 */
var EthereumBip44 = require('ethereum-bip44');
const bitcore = require('bitcore-lib');
var key = new bitcore.HDPrivateKey('xprv9s21ZrQH143K4A4DkDUKpuEH8eAqbJbPLLRkE5Aj3KCGe6ZpXw1W2gWWHbt8fLVrxGMsQgsPPCKhhv4n9se2PoZb9JAk4PvRPvsJ4uWNi27');
var derivedPubKey = key.derive("m/44'/60'/0'/0").hdPublicKey;

(() => {
// create the hd wallet

var bitcore = require('bitcore-lib');
var EthereumBip44 = require('ethereum-bip44');
// create the hd wallet
var wallet = EthereumBip44.fromPrivateSeed('111');
// output the first address
console.log(wallet.getAddress(0));
// output the second address
console.log(wallet.getAddress(1));
})()
