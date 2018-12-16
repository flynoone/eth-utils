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
console.log('eth: ', createKeccakHash('keccak256').update(new Buffer('f86b018502540be40082c35094218b7a20085f274f1ad08088a7fbae63b143b288870462c56df9a8008029a07c06ba17c6cf2f3dd76f693a8609b6efca92863cb4b395733734997253580bdea063bfc79fcc3a5ac4d353fefa9e26853437ed64f865c4721f848b6f058663217c', 'hex')).digest('hex'))

// 
console.log('thor: ', createKeccakHash('keccak256').update(new Buffer('f86a018483215601825208946d90b87233b327363283e50d0e69cab50c58249d870f3f3da7ec7b208025a075261d6182328ee49001506ded0507a25ae7499f234596e2cf37fe67958506f4a065adc3c8cd2fe4e89c6e7d6eb49ee47487391fde744519a4623347f020063a5f', 'hex')).digest('hex'))

function sha256(rawdata) {
    return crypto.createHash('sha256').update(rawdata).digest()
}

const hashF = sha256(new Buffer('01000000019bf400d6b7f44507c86a9e6043c856cc5c4ac9d2cbd98a974127425692ff847300000000fdfd0000483045022100b588f0ddcac4f322da909933d6ce60adb80ff4466818a2201079a638906d6f1e0220495999a6c95bc1ea762bcecf98e98b068b8dc94f463098fc8d18ce78f61fa8210147304402202585b0e4599eba8231127f08b78a4354d8d9b9476506b74ff5cf5b88d9c552ce0220710cc7b4f4d7a813cc5fdcb92795e1a2e6441fff3503b8a8812948a0dfa94974014c6952210223c25116ce2a8cdc6c1e02e4f9d09e89e655f2cbbc9a8236e6c98d8d17075c8b21033131b00f37436b57f4398a43224036e8e5f444b6ee01c7aa828ca0a742e6e0ba21037bd98e72e2953c352a81f51e7b8789d29e3e2f955246c2c6a95fb072fb78a94c53aeffffffff013f0800000000000017a91491248b34aac97c4e51a4482f4ef40d066002806e8700000000', 'hex'))
console.log('hashF: ', hashF)
const hashS = sha256(hashF)
console.log('btc: ', hashS.toString('hex'))