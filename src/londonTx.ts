/*
 * @Author: your name
 * @Date: 2021-07-08 15:59:31
 * @LastEditTime: 2021-07-12 10:16:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eth-web3-utils/src/londonTx.ts
 */
import Common from '@ethereumjs/common'
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx'
const { getTransactionCount, sendRawTransaction } = require('./rpc');

// mainnet: 1, ropsten: 3
const common = new Common({ chain: 'ropsten', hardfork: 'london' });

const privateKey = Buffer.from('adc67fa4735d355ccd2e567e80c525db380990f65953929d5e42b803e108b13d','hex')
const address = '0xf8dc84221c12d73918f4610064a7e0f00c869613';

(async () => {
  const nonce = await getTransactionCount(address)
  const txData = {
    // "data": "0x",
    "gasLimit": "0x7a120",
    "maxPriorityFeePerGas": "0x1", // 1 Gwei
    "maxFeePerGas": "0x3b9ad0cc",
    "nonce": nonce,
    "to": "0x6ea462e163adb78cafa6b57c5680ab8689a3f193",
    "value": "0x134a8e65216000",
    // "v": "0x01",
    // "r": "0xafb6e247b1c490e284053c87ab5f6b59e219d51f743f7a4d83e400782bc7e4b9",
    // "s": "0x479a268e0e0acd4de3f1e28e4fac2a6b32a4195e8dfa9d19147abe8807aa6f64",
    "chainId": "0x03",
    "accessList": [],
    "type": "0x02"
  }
  
  const tx = FeeMarketEIP1559Transaction.fromTxData(txData, { common })
  
  const signedTx = tx.sign(privateKey)
  
  const serializedTx = signedTx.serialize()
  // console.log(serializedTx.toString('hex'))
  const raw_data = '0x' + serializedTx.toString('hex')
  console.log('raw: ', raw_data)
  
  // broadcast tx 
  await sendRawTransaction(raw_data)
})()


/**
 * EIP1559 https://eips.ethereum.org/EIPS/eip-1559
 * https://cj.sina.com.cn/articles/view/6311913111/178382697020016oxs?sudaref=www.google.com&display=0&retcode=0
 * 
 * Gas Fee设置
   maxFeePerGas = 2 * getBlock(-1).baseFee + maxPriorityFeePerGas
   maxPriorityFeePerGas = 1 gwei
 * 测试交易数据： 0x5adc7a8ef767f307cb95a70e4793487b93b139c566ea88c9e0034eeabaf41bdf 
   0x79047c596aeb644ef584a9d02511a82a3e2c58dbb3d7b6de9bb953fbadb9bd02 (maxPriorityFeePerGas == 1wei)
 * 一笔交易的最终手续费：fee = (maxPriorityFeePerGas + Block BaseFee Per Gas) * gas_used
 * tx_fee_saving = (maxFeePerGas - (maxPriorityFeePerGas + Block BaseFee Per Gas)) * gas_used
 */