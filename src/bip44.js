/**
 * https://www.npmjs.com/package/ethereum-bip44
 */
var EthereumBip44 = require('ethereum-bip44');
var key = new bitcore.HDPrivateKey('xprv9s21ZrQH143K4A4DkDUKpuEH8eAqbJbPLLRkE5Aj3KCGe6ZpXw1W2gWWHbt8fLVrxGMsQgsPPCKhhv4n9se2PoZb9JAk4PvRPvsJ4uWNi27');
var derivedPubKey = key.derive("m/44'/60'/0'/0").hdPublicKey;
(() => {
// create the hd wallet
var wallet = EthereumBip44.fromPublicSeed(derivedPubKey.toString());
// output the first address
console.log(wallet.getAddress(0));
// output the second address
console.log(wallet.getAddress(1));

console.log(wallet.getPrivateKey(0))
})()

/*var bitcore = require('bitcore-lib');
var EthereumBip44 = require('ethereum-bip44');
// create the hd wallet
var wallet = EthereumBip44.fromPrivateSeed('11494bf2213064b3b885f3226e78c29273eefcb2fba8f1934df2abdc15e7bdc0138dac7206357bb599dd11a2eb11c8c621420be7b01d9affa55b46db4fc42215');
// output the first address
console.log(wallet.getAddress(0));
// output the second address
console.log(wallet.getAddress(1));*/