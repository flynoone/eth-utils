const keythereum = require("keythereum")
const { randomBytes } = require("crypto")

/// privatekey => keystore
function encrypt(privateKey, password) {
    return new Promise(resolve => {
        keythereum.dump(password, privateKey, randomBytes(32), randomBytes(16), {
            cipher: 'aes-128-ctr',
            kdf: 'scrypt', 
            kdfparams: {
                dklen: 32,
                memory: 280000000,
                n: 262144,
                p: 1,
                r: 8,
            },
        }, resolve);
    });
}

/// keystore => privatekey
function decrypt(ks, password) {
    return new Promise((resolve, reject) => {
        keythereum.recover(password, ks, (r) => {
            if (!Buffer.isBuffer(r)) {
                return reject(r);
            }
            resolve(r);
        });
    });
}

encrypt('91598453f8e6bf900fea0f8e3664d077678c8db7586bfccf92f700f60537bfe0', '123').then(r => {
    console.log(r)

    decrypt(r, '123').then((r: any) => {
        console.log('decrypt: ', r.toString('hex'))
    }).catch(err => {
        console.log(err)
    })
}).catch(err => {
    console.log(err)
})
