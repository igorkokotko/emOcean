const { db, auth } = require('../config/databaseConfig')

const createUserWithEmailAndPassword = (email, password, nickname) => {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // At current moment created some simple logic to test availability to send some data in db
        db.collection('profiles')
          .doc('profile-' + user.uid)
          .set({ nickname })
        resolve(user)
      })
      .catch(err => {
        reject(err)
      })
  })
}
const loginWithEmailAndPassword = function(email, password) {
  return new Promise(function(resolve, reject) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // sending user uid to create token
        resolve(user.uid)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const passwordRecovery = function(email) {
  return new Promise(function(resolve, reject) {
    auth().useDeviceLanguage()
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve('Email sent')
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = {
  createUserWithEmailAndPassword,
  loginWithEmailAndPassword,
  passwordRecovery
}
