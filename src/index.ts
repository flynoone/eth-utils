const Web3 = require('web3')

let web3

export async function init() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider)
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    }

    web3.eth.getCoinbase((err, result) => {
        if(err)
            console.log(err)

        console.log('coinbase=', result)
    })

    ethAccount()
    ethWallet()
}

interface EthAccount{
    address: string
    privateKey: string
}

const ethAccount = () => {
    try {
    const account: EthAccount = web3.eth.accounts.create('123')
    console.log(account)

    const private_account: EthAccount =  web3.eth.accounts.privateKeyToAccount(account.privateKey)
    console.log(private_account)

    const keyStore = web3.eth.accounts.encrypt(account.privateKey, '123456')
    // console.log(`keystore: ${JSON.stringify(keyStore)}`)

    const keyStore_account: EthAccount = web3.eth.accounts.decrypt(JSON.stringify(keyStore), '123456')
    console.log(`keyStore_account: ${keyStore_account.address}`);

    } catch (error) {
        console.log(error.toString())
    }
}

const ethWallet = () => {
    try {
        const wallets = web3.eth.accounts.wallet
        console.log(`wallets: ${wallets.length}`)
        for (const key in wallets) {
            if (wallets.hasOwnProperty(key)) {
                const element = wallets[key];
                console.log(element)
            }
        }
        // const create_wallet = web3.eth.accounts.wallet.create(2)
        // console.log('create_wallet: ', create_wallet)
    } catch (error) {
        console.log(`ethWallet: ${error.toString()}`)
    }
}

init()