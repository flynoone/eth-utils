const txDecoder = require('ethereum-tx-decoder');
const fs = require('fs')
const readline = require('readline');

/**
 * 查找目标交易Nonce
 */
const rl = readline.createInterface({
    input: fs.createReadStream(__dirname +'/signed_raw_tx.txt'),
    output: process.stdout,
    terminal: false
});

rl.on('line', raw_data => {
    const d_tx = txDecoder.decodeTx(raw_data);
    const nonce = d_tx['nonce']
    if(nonce < 260541 || nonce >=261541) {
        console.log('目标nonce: ',nonce)
    }
});

// const d_tx = txDecoder.decodeTx('')

// console.log(d_tx)