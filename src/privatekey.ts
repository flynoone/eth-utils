const { randomBytes } = require("crypto")
const secp256k1 = require("secp256k1")
const keccak = require("keccak")
generatePrivateKey()

function generatePrivateKey() {
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