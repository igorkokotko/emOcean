const firebasePackage = require("firebase");
require("firebase/auth");
require("firebase/firestore");
const FirebaseDatabase = require("../FirebaseDatabase");

const firebase = new FirebaseDatabase("firebaseDatabase", {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
});
firebase.initDB(firebasePackage);

module.exports = firebase;
