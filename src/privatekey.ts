import { toChecksumAddress } from "./tool"
const { randomBytes } = require("crypto")
const secp256k1 = require("secp256k1")
const keccak = require("keccak")

// generate private key
// generatePrivateKey()

// 30a506566270e107da08c7ccbf621024b9917215c9ca3ce6f4c6510dc8043b89
// 9a9821c49d2299e9C6597336BAba3cf7B561af9d
checksumAddress('9a9821c49d2299e9c6597336baba3cf7b561af9d')

function checksumAddress(address: string) {
    const checkSumAddr = toChecksumAddress(address)
    console.log(checkSumAddr)
}

export function generatePrivateKey() {
    const msg = randomBytes(32)
    console.log('msg: ', msg.toString('hex'))

    // generate private key
    let privKey = randomBytes(32)
    console.log('private key: ', privKey.toString('hex'))

    // verify private key
    const isprivkey = secp256k1.privateKeyVerify(privKey)
    console.log('verify private key: ', isprivkey)

    // get public key
    const pubKey = secp256k1.publicKeyCreate(privKey, false)
    console.log('public key', pubKey.toString('hex'))

    // sign the message
    const sigObj = secp256k1.sign(msg, privKey)
    console.log('sig obj: ', sigObj.signature.toString('hex'))

    // verify sign 
    const verifySignObj = secp256k1.verify(msg, sigObj.signature, pubKey)
    console.log('verify sign obj: ', verifySignObj)

    // generate address
    const address = keccak256(pubKey.slice(1)).slice(12);
    console.log('address: ', address.toString('hex'))

    // to checksum address
    const checkSumAddress = toChecksumAddress(address.toString('hex'))
    console.log('checkSumAddress: ', checkSumAddress)
}

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