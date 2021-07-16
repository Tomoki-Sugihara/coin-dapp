import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import firebase from 'firebase/app'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: 'coin-dapp',
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export const functions = firebase.functions()

// eslint-disable-next-line import/no-default-export
export default firebase
