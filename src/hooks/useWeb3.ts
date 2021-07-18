import artifacts from 'blockchain/build/Token.json'
import Common from 'ethereumjs-common'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useOpenlogin } from 'src/hooks/useOpenlogin'
import { userState } from 'src/state/user'
import { accountState, contractState, web3State } from 'src/state/web3'
import { auth, db } from 'src/utils/firebase'
import useSWR from 'swr'

export const useWeb3 = () => {
  const web3 = useRecoilValue(web3State)
  const [contract, setContract] = useRecoilState(contractState)
  const [account, setAccount] = useRecoilState(accountState)
  const [{ uid }, setUser] = useRecoilState(userState)
  const { data: openlogin } = useOpenlogin()

  const { data: networkId } = useSWR('networkId', () => web3.eth.net.getId(), { revalidateOnFocus: false })

  const fetchContract = useCallback(() => {
    if (!networkId) return
    const contract = new web3.eth.Contract((artifacts as any).abi, (artifacts as any).networks[networkId].address)
    setContract(contract)
  }, [web3, networkId, setContract])

  useEffect(() => {
    fetchContract()
  }, [fetchContract])

  const fetchAccount = useCallback(async () => {
    if (!openlogin) return
    const privKey = openlogin.privKey
    // already logged in torus
    if (privKey) {
      const { address, privateKey } = web3.eth.accounts.privateKeyToAccount(privKey)
      setAccount({ address, privateKey })

      if (!uid) {
        const userInfo = await openlogin.getUserInfo()
        if (!userInfo.email) return

        const userCredential = await auth
          .signInWithEmailAndPassword(userInfo.email, privateKey)
          .catch(async (error) => {
            if (error.code === 'auth/user-not-found') {
              return await auth.createUserWithEmailAndPassword(userInfo.email, privateKey)
            }
            throw new Error(`Failed to firebase login \n\n${error}`)
          })

        const { user, additionalUserInfo } = userCredential
        if (user) {
          const { uid } = user
          if (additionalUserInfo?.isNewUser) {
            await db.doc(`users/${uid}`).set({ address }, { merge: true })
          }
          setUser({ uid })
        }
      }
    } else {
      setAccount({ address: '', privateKey: '' })
    }
  }, [openlogin, uid, web3.eth, setUser, setAccount])

  useEffect(() => {
    fetchAccount()
  }, [fetchAccount])

  const runContract = async (functionAbi: any) => {
    if (!contract) return

    const nonce = await web3.eth.getTransactionCount(account.address)
    const details = {
      nonce,
      gasPrice: 0,
      gasLimit: 8000000,
      from: account.address,
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
    transaction.sign(Buffer.from(account.privateKey.slice(2), 'hex'))
    const rawData = '0x' + transaction.serialize().toString('hex')

    await web3.eth
      .sendSignedTransaction(rawData)
      .on('receipt', (receipt) => console.log(receipt)) // eslint-disable-line no-console
      .on('error', (error) => console.error(error))
  }

  const { address, privateKey } = account
  return {
    web3,
    networkId,
    contract,
    address,
    privateKey,
    runContract,
  }
}
