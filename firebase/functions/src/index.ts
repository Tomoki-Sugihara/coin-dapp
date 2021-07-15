// import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { ownerAddress, ownerPrivateKey } from './utils/config'
import { getContract, getWeb3, runContract } from './utils/web3'

const miningInitialToken = async (snapshot: functions.firestore.QueryDocumentSnapshot) => {
  const { address } = snapshot.data()
  if (!address) throw new Error('Address is defined.')

  const tokenArtifacts = require('blockchain/build/Token.json')

  const web3 = getWeb3()
  const tokenContract = getContract(web3, tokenArtifacts, 1515)
  const abi = tokenContract.methods.initialToken(address).encodeABI()

  await runContract(web3, tokenContract, 1515, abi, ownerAddress, ownerPrivateKey)
}

exports.createUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}')
  .onCreate((snapshot, _context) => miningInitialToken(snapshot))
