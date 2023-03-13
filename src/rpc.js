const axios = require('axios')
// const rpc = 'https://ropsten.infura.io/v3/add4bc608e6948bdb43de358f6890825';
// const rpc = 'https://mainnet.infura.io/v3/add4bc608e6948bdb43de358f6890825';

// BSC 
const rpc = "https://rpc.coredao.org"

// (async () => {
//     await getTransactionCount('0x21e5487EF5245d3f50b4eB3301129c68A26daD8E')
//     // await sendRawTransaction('0xf8ac830249f08502540be40082c35094dac17f958d2ee523a2206206994597c13d831ec780b844a9059cbb000000000000000000000000b385d810cc3bf0f4a4629528967e18cd0196e07700000000000000000000000000000000000000000000000000000000004c4b4025a032c912c54abbaf2fce873e6e1549354f433d7e17487e633d8a5e9b0ebdf7a06ca07bbb628802c9305802d478f9f4d35127ff0e7fa7b0e2c396c2bb570a8b4ae025')
// //0xf8a9048502540be40082c35094dac17f958d2ee523a2206206994597c13d831ec780b844a9059cbb000000000000000000000000b385d810cc3bf0f4a4629528967e18cd0196e077000000000000000000000000000000000000000000000000000000174876e80025a0d6696f9492254738f0ca4023fee8b7115d35914fa92997ef0f5683c2d5189a5fa07e2b7c641ed8617f74a2f7ee3a84ea492dd6a4aae3961a0ce3f073f5985dc850
//     await gasPrice()
// })()

async function getTransaction(txid) {
    response = await axios.post(rpc, {
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [txid],
        id: 67
    }).catch((err) => {
        console.log('err ', err.toString())
    });

    console.log('tx: ', response.data)
}

async function getTransactionReceipt(txid) {
    response = await axios.post(rpc, {
        jsonrpc: '2.0',
        method: 'eth_getTransactionReceipt',
        params: [txid],
        id: 1
    }).catch(err => {
        console.log('err: ', err.toString())
    })

    console.log('tx re: ', response.data)
}

async function estimateGas(params) {
    response = await axios.post(rpc, {
        jsonrpc: '2.0',
        method: 'eth_estimateGas',
        params: [params],
        id: 1
    }).catch(err => {
        console.log('estimate gas', err.toString())
    })

    console.log('es gas: ', response.data)
}

async function gasPrice() {
    response = await axios.post(rpc, {
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: 1
    }).catch(err => {
        console.log('gasprice', err.toString())
    })

    console.log('gas price: ', response.data)
}

//eth_accounts
async function ethAccounts() {
    response = await axios.post(rpc, {
        jsonrpc: '2.0',
        method: 'eth_accounts',
        params: [],
        id: 1
    }).catch(err => {
        console.log('eth_accounts', err.toString())
    })

    console.log('eth_accounts: ', response.data)
}

async function sendRawTransaction(raw) {
    response = await axios.post(rpc, {
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [raw],
        id: 1
    }).catch(err => {
        console.log('sendRawTransaction', err.toString())
    })

    console.log('sendRawTransaction: ', response.data)
}

async function getTransactionCount(address) {
    response = await axios.post(rpc, {
        jsonrpc: '2.0',
        method: 'eth_getTransactionCount',
        params: [address, 'latest'],
        id: 1
    }).catch(err => {
        console.log('getTransactionCount', err.toString())
    })

    console.log('getTransactionCount: ', response)
    return response.data.result
}

module.exports = {sendRawTransaction, getTransactionCount}  
