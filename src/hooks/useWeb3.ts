import artifacts from 'blockchain/build/Token.json'
import Common from 'ethereumjs-common'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useOpenlogin } from 'src/hooks/useOpenlogin'
import { accountState, contractState, web3State } from 'src/state/web3'
import useSWR from 'swr'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}

export const useWeb3 = () => {
  const web3 = useRecoilValue(web3State)
  const [contract, setContract] = useRecoilState(contractState)
  const [{ address, privateKey }, setAccount] = useRecoilState(accountState)
  const { data: openlogin } = useOpenlogin()

  const { data: networkId } = useSWR('networkId', () => web3.eth.net.getId(), { revalidateOnFocus: false })

  const fetchContract = useCallback(async () => {
    if (!networkId) return
    const contract = new web3.eth.Contract((artifacts as any).abi, (artifacts as any).networks[networkId].address)
    setContract(contract)
  }, [web3, networkId, setContract])

  useEffect(() => {
    fetchContract()
  }, [fetchContract])

  const fetchAccount = useCallback(() => {
    const privKey = openlogin?.privKey
    if (privKey) {
      const account = web3.eth.accounts.privateKeyToAccount(privKey)
      setAccount({ address: account.address, privateKey: account.privateKey })
    }
  }, [openlogin, web3.eth.accounts, setAccount])

  useEffect(() => {
    fetchAccount()
  }, [fetchAccount])

  const toContract = async (functionAbi: any) => {
    if (!web3 || !contract) return
    const EthereumTx = require('ethereumjs-tx').Transaction
    const details = {
      nonce: 0,
      gasPrice: 0,
      gasLimit: 8000000,
      from: address,
      to: contract.options.address,
      data: functionAbi,
    }
    const customCommon = Common.forCustomChain(
      'mainnet',
      {
        name: 'privatechain',
        networkId: networkId,
        chainId: networkId,
      },
      'petersburg',
    )

    return new Promise<void>((resolve, reject) => {
      web3.eth.getTransactionCount(address, async (err, nonce) => {
        details.nonce = nonce
        const transaction = await new EthereumTx(details, { common: customCommon })
        transaction.sign(Buffer.from(privateKey.slice(2), 'hex'))
        const rawdata = '0x' + transaction.serialize().toString('hex')
        await web3.eth
          .sendSignedTransaction(rawdata)
          .on('transactionHash', (hash) => {
            console.log(['transferToStaging Trx Hash:' + hash]) // eslint-disable-line no-console
          })
          .on('receipt', async (receipt) => {
            resolve(console.log(['transferToStaging Receipt:', receipt])) // eslint-disable-line no-console
          })
          .on('error', (error) => {
            reject(console.error(error))
          })
      })
    })
  }

  return {
    web3,
    networkId,
    contract,
    address,
    privateKey,
    toContract,
  }
}
