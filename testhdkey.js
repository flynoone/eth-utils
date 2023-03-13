const HDKey = require('hdkey');
const secp256k1 = require("secp256k1");
const keccak = require("keccak");


(() => {
    var seed = '0ee1b1bbd64da87f6259a3b0eb69b58ff994312ab74c080db473a36deea0907e'
    var hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
    var childkey = hdkey.derive("m/44'/60'/0'/0/0")

    const pk = childkey.privateKey.toString("hex")
    console.log(pk)
    // -> "xprv9zFnWC6h2cLgpmSA46vutJzBcfJ8yaJGg8cX1e5StJh45BBciYTRXSd25UEPVuesF9yog62tGAQtHjXajPPdbRCHuWS6T8XA2ECKADdw4Ef"
    console.log(childkey.publicKey.toString("hex"))

    const address = privtoAddress(pk)
    console.log(address)
})()


function privtoAddress(priv) {
    const privKey = Buffer.from(priv, 'hex')
    const isprivkey = secp256k1.privateKeyVerify(privKey)
    console.log('verify private key: ', isprivkey)

    // get public key
    const pubKey = secp256k1.publicKeyCreate(privKey, false)
    console.log('public key', pubKey.toString('hex'))

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