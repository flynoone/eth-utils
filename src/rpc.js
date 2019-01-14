const axios = require('axios')
const rpc = 'https://mainnet.infura.io/v3/add4bc608e6948bdb43de358f6890825'

const txid = '0xb42853ec6856c9da9ac0b041da5fefb97c814ec581c10df6ece83dc3522a9863'

start()

async function start() {

    // await getTransaction(txid)

    // await getTransactionReceipt(txid)
    await gasPrice()

    const tx = {
        from: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602',
        nonce: 15,
        to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602', 
        value: '0x11', 
        data: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602d3ae78222beadb038203be21ed5ce7c9b1bff602',
    }
    await estimateGas(tx)
}

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