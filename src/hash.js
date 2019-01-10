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
console.log('eth: ', createKeccakHash('keccak256').update(new Buffer('f865098609184e72a00082520894d3ae78222beadb038203be21ed5ce7c9b1bff602108029a0798b4e082f76675469ec016a577c870af5c3c083b0df81efb887337eae47694ba037d6589a0369660510d8c54765e0e9ddece71f5f4f5c81b94f7ab54e3b7ace97', 'hex')).digest('hex'))

function sha256(rawdata) {
    return crypto.createHash('sha256').update(rawdata).digest()
}

const hashF = sha256(new Buffer('01000000019bf400d6b7f44507c86a9e6043c856cc5c4ac9d2cbd98a974127425692ff847300000000fdfd0000483045022100b588f0ddcac4f322da909933d6ce60adb80ff4466818a2201079a638906d6f1e0220495999a6c95bc1ea762bcecf98e98b068b8dc94f463098fc8d18ce78f61fa8210147304402202585b0e4599eba8231127f08b78a4354d8d9b9476506b74ff5cf5b88d9c552ce0220710cc7b4f4d7a813cc5fdcb92795e1a2e6441fff3503b8a8812948a0dfa94974014c6952210223c25116ce2a8cdc6c1e02e4f9d09e89e655f2cbbc9a8236e6c98d8d17075c8b21033131b00f37436b57f4398a43224036e8e5f444b6ee01c7aa828ca0a742e6e0ba21037bd98e72e2953c352a81f51e7b8789d29e3e2f955246c2c6a95fb072fb78a94c53aeffffffff013f0800000000000017a91491248b34aac97c4e51a4482f4ef40d066002806e8700000000', 'hex'))
console.log('hashF: ', hashF)
const hashS = sha256(hashF)
console.log('btc: ', hashS.toString('hex'))