import Common from 'ethereumjs-common'
import { config } from 'firebase-functions'
import Web3 from 'web3'
import type { Contract } from 'web3-eth-contract'

export const getWeb3 = () => {
  const chainId = config().contract.chainId
  const web3 = new Web3(new Web3.providers.HttpProvider(chainId))
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
    .on('receipt', (receipt) => console.log(receipt)) // eslint-disable-line no-console
    .on('error', (error) => console.error(error))
}
