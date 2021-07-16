import Common from 'ethereumjs-common'
import Web3 from 'web3'
import type { Contract } from 'web3-eth-contract'

import { chainUrl } from './config'

export const getWeb3 = () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(chainUrl))
  return web3
}

export const getContract = (web3: Web3, artifacts: any, networkId: number) => {
  const contract = new web3.eth.Contract((artifacts as any).abi, (artifacts as any).networks[networkId].address)
  return contract
}

export const runContract = async (
  web3: Web3,
  contract: Contract,
  networkId: number,
  functionAbi: any,
  address: string,
  privateKey: string,
) => {
  const nonce = await web3.eth.getTransactionCount(address)
  const details = {
    nonce,
    gasPrice: 0,
    gasLimit: 8000000,
    from: address,
    to: contract.options.address,
    data: functionAbi,
  }
  const customCommon = Common.forCustomChain(
    'mainnet',
    { name: 'privatechain', networkId, chainId: networkId },
    'petersburg',
  )

  const Transaction = require('ethereumjs-tx').Transaction
  const transaction = new Transaction(details, { common: customCommon })
  transaction.sign(Buffer.from(privateKey.slice(2), 'hex'))
  const rawData = '0x' + transaction.serialize().toString('hex')

  await web3.eth
    .sendSignedTransaction(rawData)
    .on('transactionHash', (hash) => console.log('hash', hash)) // eslint-disable-line no-console
    .on('receipt', () => console.log('receipt!')) // eslint-disable-line no-console
    .on('error', (error) => console.error(error.message))
}
