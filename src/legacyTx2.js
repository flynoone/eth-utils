const EthereumTx = require('ethereumjs-tx');
const { web3 } = require('web3');
const { getTransactionCount, sendRawTransaction } = require('./rpc');
const { toBN, toWei, toHex } = require('web3-utils');

const account = '0x91a5c68097568bf8eb948d325e86aa6c0d44ae87'
const privateKey = Buffer.from('75933f7d367d73a5fd397b8fae555df248a670b73b7b3a920dc2579cc3f275f9', 'hex')
const toAddresses = ["0x59ae6be7ce390f5214af0561ef9b261ac8f3984e"];

(async () => {
  const nonce = await getTransactionCount(account)

  for (let index = 0; index < toAddresses.length; index++) {
    const to_addr = toAddresses[index];
    const txParams = {
      // type: 0,
      from: account,
      nonce: toBN(nonce).add(toBN(index)),
      gasPrice: 5* 10**9,
      gasLimit: "0x5208", // 21000
      to: to_addr,
      value: toHex(toWei('0.00014')),
      data: '0x',
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