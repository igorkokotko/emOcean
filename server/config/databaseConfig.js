const firebasePackage = require('firebase')
require('firebase/auth')
require('firebase/firestore')

firebasePackage.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
})

const db = firebasePackage.firestore()
const auth = firebasePackage.auth
module.exports = {
  firebase: firebasePackage,
  db,
  auth
}
