/*
 * @Author: your name
 * @Date: 2019-09-01 14:54:50
 * @LastEditTime: 2021-07-28 16:14:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eth-web3-utils/src/hash.js
 */
const createKeccakHash = require("keccak")
var hash = require('hash.js')
const crypto = require('crypto')

function keccak256(...data) {
    const h = keccak('keccak256');
    data.forEach(d => {
        if (Buffer.isBuffer(d)) {
            h.update(d);
        }
        else {
            h.update(Buffer.from(d, 'utf8'));
        }
    });
    return h.digest();
}

// eth hash(transaction hash)
console.log('eth: ', createKeccakHash('keccak256').update(Buffer.from('1958cb60285764a002ba0000000001003056372503a85b0000c6eaa6645232013059393021cea2d800000000a8ed32326812656274657374314066696f746573746e657402034243480342434818626974636f696e636173683a617364666173646661736466044441534804444153481764617368616464726573736173646661736466617364660046c323000000003059393021cea2d80000', 'hex')).digest('hex'))

// keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")
console.log('permit: ', createKeccakHash('keccak256').update(Buffer.from('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)')).digest('hex'))

console.log('balanceOf: ', createKeccakHash('keccak256').update(Buffer.from('balanceOf(address)')).digest('hex'))

console.log('name: ', createKeccakHash('keccak256').update(Buffer.from('name()')).digest('hex'))

// event Transfer(address indexed _from, address indexed _to, uint256 _value)
console.log('Event Transfer: ', keccakHash('Transfer(address,address,uint256)').substr(0,8))

// nativeAssetBalance(address addr, uint256 assetID)
console.log('nativeAssetBalance: ', keccakHash('nativeAssetBalance(address,uint256)').substr(0,8))

console.log('name: ', createKeccakHash('keccak256').update(Buffer.from('736e6f7773746f726d', 'hex')).digest('hex'))


// hash hex string
function keccakHash(raw) {
    return createKeccakHash('keccak256').update(Buffer.from(raw)).digest('hex')
}

function sha256(rawdata) {
    return crypto.createHash('sha256').update(rawdata).digest()
}

const hashF = sha256(Buffer.from('1958cb60285764a002ba0000000001003056372503a85b0000c6eaa6645232013059393021cea2d800000000a8ed32326812656274657374314066696f746573746e657402034243480342434818626974636f696e636173683a617364666173646661736466044441534804444153481764617368616464726573736173646661736466617364660046c323000000003059393021cea2d80000', 'hex'))
console.log('hashF: ', hashF.toString('hex'))
const hashS = sha256(hashF)
console.log('btc: ', hashS.toString('hex'))