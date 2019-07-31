const axios = require('axios')
const rpc = 'https://ropsten.infura.io/v3/add4bc608e6948bdb43de358f6890825'

const txid = '0x6eb2c34cdbe13eced9b613e8a864c5c6c3e397317cfce22f64047174c791183e'

// start()

async function start() {

    await getTransaction(txid)

    await getTransactionReceipt(txid)

    await gasPrice()

    await ethAccounts()

    await getTransactionCount('0xf8dc84221c12d73918f4610064a7e0f00c869613')

    const tx = {
        from: '0xf8dc84221c12d73918f4610064a7e0f00c869613',
        nonce: 15,
        value: '0x0', 
        data: '0x608060405234801561001057600080fd5b506104ce806100206000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806315eaef6b146100645780632ab1a846146100d1578063b3cbb11d14610111578063d074e5351461017b575b005b34801561007057600080fd5b506100cf600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c8565b005b61010f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506102ac565b005b610179600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506102f7565b005b34801561018757600080fd5b506101c6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061038b565b005b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561026b57600080fd5b505af115801561027f573d6000803e3d6000fd5b505050506040513d602081101561029557600080fd5b810190808051906020019092919050505050505050565b8173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156102f2573d6000803e3d6000fd5b505050565b8373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f1935050505015801561033d573d6000803e3d6000fd5b508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610384573d6000803e3d6000fd5b5050505050565b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561046257600080fd5b505af1158015610476573d6000803e3d6000fd5b505050506040513d602081101561048c57600080fd5b81019080805190602001909291905050505050505600a165627a7a7230582094fc41232a751daf467a4f38b00c51c399c22b11e0614659f21f012b75e9c1ed0029',
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

(async () => {
    await getTransactionCount('0x5FC584A4607a6269A0676d9A3C30B9Fe7A52F64b')
})()

module.exports = {sendRawTransaction, getTransactionCount}