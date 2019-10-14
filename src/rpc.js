const axios = require('axios')
// const rpc = 'https://ropsten.infura.io/v3/add4bc608e6948bdb43de358f6890825'
const rpc = 'https://mainnet.infura.io/v3/add4bc608e6948bdb43de358f6890825'

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

(async function() {
    re = await getTransactionReceipt('0xce92d7d2533fbc736f54b569aa92d324a3c1e09bc71bda29e5dbd7761e297391')
})()

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

    console.log('getTransactionCount: ', response.data)
    return response.data.result
}

module.exports = {sendRawTransaction, getTransactionCount}