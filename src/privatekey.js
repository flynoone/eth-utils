const { toChecksumAddress } = require("./tool")
const { randomBytes } = require("crypto")
const secp256k1 = require("secp256k1")
const keccak = require("keccak")
const ether = require("ethers");

// generate private key

// 30a506566270e107da08c7ccbf621024b9917215c9ca3ce6f4c6510dc8043b89
// 9a9821c49d2299e9C6597336BAba3cf7B561af9d
// checksumAddress('9a9821c49d2299e9c6597336baba3cf7b561af9d')

// function checksumAddress(address) {
//     const checkSumAddr = toChecksumAddress(address)
//     console.log(checkSumAddr)
// }

async function generatePrivateKey() {

    const msg = "test sign"
    console.log('msg: ', msg.toString('hex'))

    // generate private key
    let privKey = randomBytes(32)
    // const privKey = Buffer.from("748cf39d829ce27ffe5eca4aa7525aa65dc31c59791d76d22d24339cf1104a15", 'hex')
    console.log('private key: ', privKey.toString('hex'))

    // verify private key
    const isprivkey = secp256k1.privateKeyVerify(privKey)
    console.log('verify private key: ', isprivkey)

    // get public key
    const pubKey = secp256k1.publicKeyCreate(privKey, false)
    console.log('public key', pubKey.toString('hex'))

    // // sign the message
    // const hashMsg = keccak256(msg)

    // const content = ether.utils.toUtf8Bytes("\x19Ethereum Signed Message:\n" +  String.fromCharCode(hashMsg.length) + hashMsg)
    // // const hashContent = keccak256(content);

    // const sigObj = secp256k1.sign(Buffer.from(content), privKey)
    // console.log('sig obj: ', sigObj.signature.toString('hex'))

    // verify sign 
    // const verifySignObj = secp256k1.verify(msg, sigObj.signature, pubKey)
    // console.log('verify sign obj: ', verifySignObj)

    // generate address
    const address = keccak256(pubKey.slice(1)).slice(12);
    console.log('address: ', address.toString('hex'))

    // to checksum address
    const checkSumAddress = toChecksumAddress(address.toString('hex'))
    console.log('checkSumAddress: ', checkSumAddress)

    const wallet = new ether.Wallet(privKey);
    
    // const signMsg = await wallet.signMessage(hashMsg);

    // console.log(`msg sign: ${signMsg}`)
    // wallet.verify()
}

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

(async () => {
    privtoAddress('a1c552c5707bb7f4aebb2f4d78ac1dfb70a662ff2914f5b0bd1f7720f29fd67d')

    privtoAddress('662c4b85d0f56be6910e89b97c3bb198e8c543a5c9050259ba80eb4cf7bd9da1')
    
    privtoAddress('eae608aca47387ff022fcccf4d6695b592ea9cee5f3a4e4f7258eaf764e13704')

    privtoAddress('494cf2e9096ef0f9a002ebc9809f829bacde58404722a24003e644bd2a41339d') 
    
    privtoAddress('38e69f6395215ef36e72b50550c1d195f05a5189d539bd160692b1e2746377b3') 

    await generatePrivateKey()
})()