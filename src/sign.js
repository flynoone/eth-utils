const { randomBytes } = require("crypto")
const secp256k1 = require("secp256k1")
const keccak = require("keccak");

(async () => {
    await sign();
})()


async function sign() {
    const msg = "test sign"
    console.log('msg: ', msg.toString('hex'))

    // generate private key
    const privKey = Buffer.from("adc67fa4735d355ccd2e567e80c525db380990f65953929d5e42b803e108b13d", 'hex')
    console.log('private key: ', privKey.toString('hex'))

    // get public key
    const pubKey = secp256k1.publicKeyCreate(privKey, false)
    console.log('public key', pubKey.toString('hex'))
    
    // sign the message
    const hashMsg = keccak256(msg)

    // const content = ether.utils.toUtf8Bytes("\x19Ethereum Signed Message:\n" +  String.fromCharCode(hashMsg.length) + hashMsg)

    const sig = secp256k1.sign(Buffer.from(hashMsg), privKey)
    console.log('sig obj: ', sig.signature.toString('hex'))

    var ret = {};
    ret.r = sig.signature.slice(0, 32).toString('hex');
    ret.s = sig.signature.slice(32, 64).toString('hex');
    ret.v = sig.recovery + 27;
    console.log(`r, s ,v : ${JSON.stringify(ret)}`)

    // verify sign 
    const verifySignObj = secp256k1.verify(hashMsg, sig.signature, pubKey)
    console.log('verify sign obj: ', verifySignObj)
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