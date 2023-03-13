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
const common = new Common({ chain: 0xfa2, hardfork: 'london' });

const privateKey = Buffer.from('a1c552c5707bb7f4aebb2f4d78ac1dfb70a662ff2914f5b0bd1f7720f29fd67d','hex')
const address = '0x79288ac3525c4e7669481571658a867f7e18f0b2';

(async () => {
  const nonce = await getTransactionCount(address)
  const txData = {
    "gasLimit": "0x7a120",
    "maxPriorityFeePerGas": "0x1", // 1 Gwei
    "maxFeePerGas": "0x3b9ad0cc",
    "nonce": nonce,
    "to": "0x6ea462e163adb78cafa6b57c5680ab8689a3f193",
    "value": "0x134a8e65216000",
    "chainId": "0xfa2",
    "accessList": [],
    "type": "0x02"
  }
  
  const tx = FeeMarketEIP1559Transaction.fromTxData(txData, { common })
  
  const signedTx = tx.sign(privateKey)
  console.log('tx: ', JSON.stringify(signedTx))
  
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