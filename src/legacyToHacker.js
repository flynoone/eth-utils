const EthereumTx = require('ethereumjs-tx');
const { web3 } = require('web3');
const { getTransactionCount, sendRawTransaction } = require('./rpc');
const { toBN, toWei, toHex, utf8ToHex } = require('web3-utils');

const account = '0xf59c11945ca9d2a913b8a89be58fa51ac2db090d'
const privateKey = Buffer.from('748cf39d829ce27ffe5eca4aa7525aa65dc31c59791d76d22d24339cf1104a15', 'hex')
const toAddresses = ["0x6454610fcea911dec770bb6af39ffba4df3eb6f1",
"0xe61c953f4389fbd1c0f5e1620d3bae36fa80f93a",
"0x3fb2ef501b03bc9183f210704eb026d0b2d172d3",
"0x5f7c08ee81408b5acef34476b63c9693fde9a0b5",
"0x3e1a7ecb05894067649476d6741a6c2a1db2b9d4",
"0xc208544504b4629ce095b0b035fba40ec91082b8",
"0xc455a9a185ff09479097c771e578ca61a099b50d",
"0x0e32dbc4f2b0f4ad31ac15f125c82033299c4e64",
"0xa16590a1de2d4cc77438aa43652e087932ef04be",
"0x5d41482282b6814592a09a4f97cca92929075315",
"0xfeb4a2f734d9827fe3ecdec51c041cd97eb06991",
"0x8819314d9247e9ee00a948a4f3bf5ce3c2fb0c9e",
"0x32f496e8a47cc880d5dc8fb7482945729578a831",
"0x75a40b4396d4a59b9f927791a8a16c23ea8016b1",
"0x0231e39c93a8aae489a1cf85d164fdf80ea77303",
"0xb396d3ce1750bee297f4eadaaf8c4844bb37034b",
"0x79e60a40440881c198e37b58559a8be4f8d69b97",
"0x7812997912715d396daa3cfa2e2c0ff83ef94241",
"0x7d009fe6d89fd6ecb92cd4637461e2801fe36b2f",
"0x7d009fe6d89fd6ecb92cd4637461e2801fe36b2f",
"0xbcf1279e7c554ad96d782317735df56b11b378f3",
"0xbcf1279e7c554ad96d782317735df56b11b378f3",
"0x2a04fc41f5b0898ff1c7657ef19031d008558258",
"0x2a04fc41f5b0898ff1c7657ef19031d008558258",
"0xa233a0c6f5dc5e24aa3be47b154285112551422d",
"0xa233a0c6f5dc5e24aa3be47b154285112551422d",
"0xe8ee69c4d2a587a3306f51a67d23eb6166f6fb8f",
"0x7e6f1b1e70ba8a12f2362ef47e22cbecdaffc20a",
"0x7e6f1b1e70ba8a12f2362ef47e22cbecdaffc20a",
"0xd08587d5275e240c8a74475dd805367fd5aaaaaf",
"0xd08587d5275e240c8a74475dd805367fd5aaaaaf",
"0xd9555a54d1eef17d63b4039bc6ecc541e6241c8b",
"0xd9555a54d1eef17d63b4039bc6ecc541e6241c8b",
"0xc4e3feee43f9297d00b06b2b893aa662a19c5de2",
"0xc567ad9c832d5312b52836cbb209195761a8ceea",
"0xc567ad9c832d5312b52836cbb209195761a8ceea",
"0x44a43cfecfe51c7d6bd7812224d831921f022032",
"0x44a43cfecfe51c7d6bd7812224d831921f022032",
"0x63f0263bd12b3b866f4dc5c87133f4a072f46543"];

(async () => {
  const nonce = await getTransactionCount(account)

  for (let index = 0; index < toAddresses.length; index++) {
    const to_addr = toAddresses[index];
    const txParams = {
      // type: 0,
      from: account,
      nonce: toBN(nonce).add(toBN(index)),
      gasPrice: 5* 10**9,
      gasLimit: toBN(100000), // 21000
      to: to_addr,
      value: 0,
      data: utf8ToHex("Dear Hacker:\n    We found that the system has been attacked by you, and we have taken emergency measures and tracked the loss of assets. Please return the stolen assets immediately. If they are not returned, we will try our best to solve them through legal channels.\n    Best Regards\n    Bitmart Team"),
      // EIP 155 chainId - mainnet: 1, ropsten: 3
      chainId: 0x38
    }

    console.log(txParams)
  
    const tx = new EthereumTx(txParams)
    const serializedTx = tx.serialize()
    const unsignedRaw = '0x' + serializedTx.toString('hex')
    // console.log(`unsigned: ${unsignedRaw}`)
  
    tx.sign(privateKey)
    const signedRaw = '0x' + tx.serialize().toString('hex')
    console.log(`signed: ${signedRaw}`)
    // broadcast tx 
    await sendRawTransaction(raw = signedRaw)  
  }

})()

// 0xdf80808252089447665be92c18c2580ff7d65601db909a35b4467a80801c8080
// 0xf85f80808252089447665be92c18c2580ff7d65601db909a35b4467a808025a069e2385248d9100c510dff22add02b3d85adf2fc03aaced3280b35abcfa990d6a038b263788b64be6d9928b8c03e032376ba472919b1de9e3ea1513d11ab94e27b