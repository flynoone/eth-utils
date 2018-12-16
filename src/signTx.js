const EthereumTx = require('ethereumjs-tx')
const FakeTx = require('ethereumjs-tx/fake.js');

const privateKey = Buffer.from('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')

const txParams = {
  nonce: '0x00',
  gasPrice: '0x09184e72a000', 
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000', 
  value: '0x00', 
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
  // EIP 155 chainId - mainnet: 1, ropsten: 3
  chainId: 3
}

const tx = new EthereumTx(txParams)
tx.sign(privateKey)
const serializedTx = tx.serialize()

console.log('raw: ', serializedTx.toString('hex'))


/// fake 
const fake = new FakeTx('f86b018502540be40082c35094218b7a20085f274f1ad08088a7fbae63b143b288870462c56df9a8008029a07c06ba17c6cf2f3dd76f693a8609b6efca92863cb4b395733734997253580bdea063bfc79fcc3a5ac4d353fefa9e26853437ed64f865c4721f848b6f058663217c');
fake.from = '0x8c5894bbbd695056e4a97fe7ec8607ecffec0782';

console.log('fake: ', fake.hash(true).toString('hex'));

