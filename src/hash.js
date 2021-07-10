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
console.log('eth: ', createKeccakHash('keccak256').update(Buffer.from('f865098609184e72a00082520894d3ae78222beadb038203be21ed5ce7c9b1bff602108029a0798b4e082f76675469ec016a577c870af5c3c083b0df81efb887337eae47694ba037d6589a0369660510d8c54765e0e9ddece71f5f4f5c81b94f7ab54e3b7ace97', 'hex')).digest('hex'))

// keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")
console.log('permit: ', createKeccakHash('keccak256').update(Buffer.from('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)')).digest('hex'))


function sha256(rawdata) {
    return crypto.createHash('sha256').update(rawdata).digest()
}

const hashF = sha256(Buffer.from('0x00000000000000003039d891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf00000002dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db000000070000000049504f80000000000000000000000001000000011255f3a247565303180664ea2c76f2cbff209db5dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db0000000700000016c35e082300000000000000000000000100000001219acbecbed1b3d6dbcaa271ea109e47b11ff68c00000001bddc7d15abcf93aff659c6c00dc7dcdeb1abc081a8bd1ed97466cb64fc4ba74100000000dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db00000005000000170cbd99e300000001000000000000000c6269746d6172742073656e640000000100000009000000015ed49d989baf688ad04e1420f08c764526962b696de04ecab49fdb5bc486cbbe3f8c1beb77fcfe017b7d2f47bd1fbee161f7c66f651cbda845379309f53462de00460d81a3', 'hex'))
console.log('hashF: ', hashF.toString('hex'))
const hashS = sha256(hashF)
console.log('btc: ', hashS.toString('hex'))