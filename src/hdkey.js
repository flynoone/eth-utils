const HDKey = require('hdkey')

const VET_DERIVATION_PATH = `m/44'/818'/0'/0/`;
const ETH_DERIVATION_PATH = `m/44'/60'/0'/0`; // m/44'/60'/0'/0

function derivePrivateKeyFromSeed(_path, seed) {
    const hdKey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
    console.log('chaincode: ', hdKey.chainCode.toString('hex'))
    console.log(hdKey.toJSON())
    return hdKey.derive(_path).toJSON();
}

const seedStr = 'a2bb16175a7e453a2898de253c65b0b09c2f89c700efe3e201feb7316fc8bea03d06db555c16b9de3ee5c7f1e78a5de9adc670dcac962c33f7b8d080dc7ff70c'
const prikey = derivePrivateKeyFromSeed(ETH_DERIVATION_PATH, seedStr)
console.log('prikey: ', prikey)


function padTo32(msg) {
    while (msg.length < 32) {
        msg = Buffer.concat([new Buffer([0]), msg]);
    }
    if (msg.length !== 32) {
        throw new Error('invalid key length: ' + msg.length);
    }
    return msg;
}