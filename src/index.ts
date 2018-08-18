const Web3 = require('web3')

let web3

export function init() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider)
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    }

    const checkAddr = web3.utils.toChecksumAddress('0x1F2C65B86D28A91E1D2b7849dda15eF8fA5e4B0c').catch(err => {
        console.log(err);
        
    })
    console.log(checkAddr)
}

init()