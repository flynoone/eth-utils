const EthereumTx = require('ethereumjs-tx')
const {sendRawTransaction, getTransactionCount} = require('./rpc')
const privateKey = Buffer.from('adc67fa4735d355ccd2e567e80c525db380990f65953929d5e42b803e108b13d', 'hex')
const Web3 = require('web3')
let web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/add4bc608e6948bdb43de358f6890825'))
}

web3.eth.getBlock('latest').then(r => {
    console.log('block number: ', r.number)
})

const ABI =[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":false,"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_amount","type":"uint256"}],"name":"tokenTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"tokenTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"sendSingle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to1","type":"address"},{"name":"_v1","type":"uint256"},{"name":"_to2","type":"address"},{"name":"_v2","type":"uint256"}],"name":"sendDouble","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const code = '0x608060405234801561001057600080fd5b506104ce806100206000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806315eaef6b146100645780632ab1a846146100d1578063b3cbb11d14610111578063d074e5351461017b575b005b34801561007057600080fd5b506100cf600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506101c8565b005b61010f600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506102ac565b005b610179600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506102f7565b005b34801561018757600080fd5b506101c6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061038b565b005b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561026b57600080fd5b505af115801561027f573d6000803e3d6000fd5b505050506040513d602081101561029557600080fd5b810190808051906020019092919050505050505050565b8173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156102f2573d6000803e3d6000fd5b505050565b8373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f1935050505015801561033d573d6000803e3d6000fd5b508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610384573d6000803e3d6000fd5b5050505050565b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561046257600080fd5b505af1158015610476573d6000803e3d6000fd5b505050506040513d602081101561048c57600080fd5b81019080805190602001909291905050505050505600a165627a7a7230582094fc41232a751daf467a4f38b00c51c399c22b11e0614659f21f012b75e9c1ed0029';

const contract_address = '0xa32cd4dda362d37d058cda4d17ce2734f33b753b'
const account1 = '0xf8dc84221c12d73918f4610064A7E0f00C869613'

async function deploy(code, gasLimit, nonce) {
    const txParams = {
        nonce: nonce,
        gasPrice: 1000000000, 
        gasLimit: gasLimit,
        to: contract_address,
        value: '0x0', 
        data: code, 
        // EIP 155 chainId - mainnet: 1, ropsten: 3
        chainId: 3
      }
      
    const tx = new EthereumTx(txParams)
    tx.sign(privateKey)
    const serializedTx = tx.serialize()
    const raw = serializedTx.toString('hex')
    console.log('raw: ', raw)

    await sendRawTransaction('0x' + raw)
}

web3Method()

async function web3Method() {
    const contract = new web3.eth.Contract(ABI, contract_address)
    console.log('options: ', contract.options.address) 
    const amount = 0.0123
    const value = (amount*10**18).toString('16')
    
    // encode
    const encode = contract.methods.sendSingle(account1, value).encodeABI()
    console.log('encode: ', encode)

    // gaslimit
    gasLimit = await contract.methods.sendSingle(account1, value).estimateGas().catch(err => {
        console.log('gas err: ', err.toString())
    })
    console.log('gas: ', gasLimit)

    // nonce
    nonce = await getTransactionCount(account1).catch(err => {
        console.log('nonce err: '. err.toString())
    })
    console.log('nonce: ', parseInt(nonce, 'hex'))

    // sign & broadcast
    await deploy(encode, gasLimit, nonce)
}

