const { db, auth } = require('../config/databaseConfig')

const createUserWithEmailAndPassword = (email, password, nickname) => {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        db.collection('users')
          .doc(user.uid)
          .set({ nickname, profileId: user.uid })
          .then(res => resolve('User created'))
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}
const loginWithEmailAndPassword = function(email, password) {
  return new Promise(function(resolve, reject) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => resolve(user))
      .catch(err => reject(err))
  })
}

const changePassword = function(oldPassword, newPassword, email) {
  return new Promise(function(resolve, reject) {
    const credential = auth.EmailAuthProvider.credential(email, oldPassword)
    auth()
      .signInWithCredential(credential)
      .then(() => {
        auth()
          .currentUser.updatePassword(newPassword)
          .then(() => resolve('Password changed'))
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}

const sendPasswordResetCode = function(email) {
  return new Promise(function(resolve, reject) {
    auth().useDeviceLanguage()
    auth()
      .sendPasswordResetEmail(email)
      .then(() => resolve('Email sent'))
      .catch(err => reject(err))
  })
}

const resetPassword = function(actionCode, newPassword) {
  return new Promise(function(resolve, reject) {
    auth().useDeviceLanguage()
    auth()
      .confirmPasswordReset(actionCode, newPassword)
      .then(() => resolve('You can now sign in with your new password'))
      .catch(err => reject(err))
  })
}

const signInWithGoogle = function(token_id) {
  return new Promise(function(resolve, reject) {
    const credential = auth.GoogleAuthProvider.credential(token_id)
    auth()
      .signInWithCredential(credential)
      .then(({ user }) => resolve(user))
      .catch(err => reject(err))
  })
}

module.exports = {
  createUserWithEmailAndPassword,
  loginWithEmailAndPassword,
  sendPasswordResetCode,
  resetPassword,
  changePassword,
  signInWithGoogle
}
