const EthereumTx = require('ethereumjs-tx');
const { getTransactionCount} = require('../rpc');

const account = '0xd66edf876e55117893d2585b703d8f703d403b9b'
const privateKey = Buffer.from('0e03772a48e024b6e9cd82c9df69593409099b514ae9c475e034a47524f51929', 'hex')
const to_addr = '0xf8dc84221c12d73918f4610064A7E0f00C869613';

(async () => {
  const nonce = await getTransactionCount(account)
  const txParams = {
    // type: 0,
    from: account,
    nonce: 7,
    gasPrice: "0x34630b8a00",
    gasLimit: "0xf588",
    to: "0x49606020d8f19875274346c89e24cca96a5bfeef",
    value: "0x71c37101f729040",
    data: "0x",
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 43114
  }
  // const txParams = {
  //   // type: 0,
  //   from: account,
  //   nonce: 6,
  //   gasPrice: "0x34630b8a00",
  //   gasLimit: "0xf588",
  //   to: "0x4F3E28F36708866D047dD63fa0c995d93e3C8E1D",
  //   value: "0x0",
  //   data: "0xa9059cbb00000000000000000000000049606020d8f19875274346c89e24cca96a5bfeef000000000000000000000000000000000000000000000000002bdbb64bc09000",
  //   // EIP 155 chainId - mainnet: 1, ropsten: 3
  //   chainId: 43114
  // }

  console.log(JSON.stringify(txParams))

  const tx = new EthereumTx(txParams)
  tx.sign(privateKey)
  const serializedTx = tx.serialize()
  const raw_data = '0x' + serializedTx.toString('hex')
  console.log('raw: ', raw_data)
  
  // broadcast tx 
  // await sendRawTransaction(raw = raw_data)
})()