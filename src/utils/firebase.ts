import 'firebase/auth'

import firebase from 'firebase/app'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth
// eslint-disable-next-line import/no-default-export
export default firebase
