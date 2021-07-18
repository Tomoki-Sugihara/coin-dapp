import * as functions from 'firebase-functions'

import { ownerAddress, ownerPrivateKey } from './utils/config'
import { getContract, getWeb3, runContract } from './utils/web3'

const miningInitialToken = async (snapshot: functions.firestore.QueryDocumentSnapshot) => {
  const { address } = snapshot.data()
  // const miningInitialToken = async () => {
  //   const address = '0x96b09F3ABA8086B5D16B6877dC1cB3fE3915B67C'
  if (!address) throw new Error('Address is not defined.')

  const web3 = getWeb3()
  web3.eth.accounts.privateKeyToAccount(ownerPrivateKey)

  const tokenArtifacts = require('./contracts/build/Token.json')
  const tokenContract = getContract(web3, tokenArtifacts, 1515)
  const initialTokenAbi = tokenContract.methods.transfer(address, 500).encodeABI()
  // const initialTokenAbi = tokenContract.methods.initialToken(address).encodeABI()

  await runContract(web3, tokenContract, 1515, initialTokenAbi, ownerAddress, ownerPrivateKey)
}

// exports.createdUsersDoc = functions.https.onCall(() => miningInitialToken())

exports.createdUsersDoc = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}')
  .onCreate((snapshot, _context) => miningInitialToken(snapshot))
