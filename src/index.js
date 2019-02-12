const Web3 = require('web3')

let web3

function init() { 
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider)
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/add4bc608e6948bdb43de358f6890825'))
    }

    web3.eth.getAccounts().then(r => {
        console.log('accounts:', r)
    })

    // web3.eth.getBlock('latest').then(r => {
    //     console.log('block: ', r)
    // })

    // web3.eth.getTransaction('0x6032047c1538fc0f47fb2acf1aec74492671b733c81221960e2cbf8f316d196c').then(r => {
    //     console.log('tx', r)
    // })

    // ethAccount()
    // ethWallet()

    personalAccount()
}

const personalAccount = () => {
    web3.eth.personal.newAccount('111111').then((result) => {
        console.log('personal accounts: ', result)
    }).catch((err) => {
        console.log('personal err: ', err)
    });
}

const ethAccount = () => {
    try {
    const account = web3.eth.accounts.create('123')
    console.log(account)

    const private_account =  web3.eth.accounts.privateKeyToAccount(account.privateKey)
    console.log(private_account)

    const keyStore = web3.eth.accounts.encrypt(account.privateKey, '123456')
    // console.log(`keystore: ${JSON.stringify(keyStore)}`)

    const keyStore_account = web3.eth.accounts.decrypt(JSON.stringify(keyStore), '123456')
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