const HDKey = require('hdkey')

const VET_DERIVATION_PATH = `m/44'/818'/0'/0/`;
const ETH_DERIVATION_PATH = `m/44'/60'/0'/0/`;

function derivePrivateKeyFromSeed(path, seed) {
    const hdKey = HDKey.fromMasterSeed(seed)
    // console.log('chaincode: ', hdKey.chainCode.toString('hex'))
    // console.log(hdKey.toJSON())
    return hdKey.derive(path).privateKey;
}

const seedStr = '09733578dbc90d393c24955f3b9d44f4ae27ce3f63fbe022667c90dbd25099747d78f9c03e53b727c04062dde9cdc802aa226ef91111a7b94253a301b8ef2e83'
const prikey = derivePrivateKeyFromSeed(ETH_DERIVATION_PATH + '0', seedStr)
console.log('prikey: ', prikey.toString('hex'))
// 6fc18bff3507a511ce65724a6abba1a420d90bff26e077ebc469d9bd86e74d74
// addr: 0x341867Fc79cAE9502391fD43874EcA8F81E2E0E9

// e2836a08d24235367a3b68531e2e69e900cae7098c58e9e02704e72e2aaffc38
// 0x6c99d18dBB38f78bbAA7e5b577063a4852C9A281

for (let index = 0; index < 20; index++) {
    const path = ETH_DERIVATION_PATH + index.toString() + "'"
    const prikey = derivePrivateKeyFromSeed(path, seedStr)
    console.log(`${path}: ${prikey.toString('hex')}`)
}

// xprv9s21ZrQH143K3YYmx7wA6vXT3xYN4XDvcfdfL924q1GD7XAkJWznxMFuuBvd5LtcNtS89cXAAbrSeH8RedHhSZbCMytWrW2uhSD8WVEVKS2
// xpub661MyMwAqRbcG2dF49UAU4UBbzNrTywmytZG8XRgPLoBzKVtr4K3W9aPkSNfqpBUoaAQJjKmVcTvEcztQCo59FDt2eqZExMu1XM7tL4wHGE
// const exHdKey = HDKey.fromExtendedKey('xprv9s21ZrQH143K3YYmx7wA6vXT3xYN4XDvcfdfL924q1GD7XAkJWznxMFuuBvd5LtcNtS89cXAAbrSeH8RedHhSZbCMytWrW2uhSD8WVEVKS2')
// console.log(exHdKey)
