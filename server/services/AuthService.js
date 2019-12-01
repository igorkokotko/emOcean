const { db, auth } = require("../config/databaseConfig");
const CustomError = require("../common/CustomError");
const nicknameKeywords = require("../common/nicknameKeywords")

const createUserWithEmailAndPassword = (email, password, nickname) => {
  return new Promise((resolve, reject) => {
    const usersRef = db.collection("users")
    usersRef
      .where("nickname", "==", nickname)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          const keywords = nicknameKeywords.setKeywords(nickname)
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
              usersRef
                .doc(user.uid)
                .set({ nickname, profileId: user.uid, keywords })
                .then(res => resolve("User created"))
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        } else {
          reject(
            new CustomError({
              name: "DatabaseError",
              message: "Nickname already taken. Try with something else",
              status: 400
            })
          )
        }
      })
  })
}

const loginWithEmailAndPassword = function (email, password) {
  return new Promise(function (resolve, reject) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => resolve(user))
      .catch(err => reject(err))
  })
}

const changePassword = function (oldPassword, newPassword, email) {
  return new Promise(function (resolve, reject) {
    const credential = auth.EmailAuthProvider.credential(email, oldPassword)
    auth()
      .signInWithCredential(credential)
      .then(() => {
        auth()
          .currentUser.updatePassword(newPassword)
          .then(() => resolve("Password changed"))
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}

const sendPasswordResetCode = function (email) {
  return new Promise(function (resolve, reject) {
    auth().useDeviceLanguage()
    auth()
      .sendPasswordResetEmail(email)
      .then(() => resolve("Email sent"))
      .catch(err => reject(err))
  })
}

const resetPassword = function (actionCode, newPassword) {
  return new Promise(function (resolve, reject) {
    auth().useDeviceLanguage()
    auth()
      .confirmPasswordReset(actionCode, newPassword)
      .then(() => resolve("You can now sign in with your new password"))
      .catch(err => reject(err))
  })
}

const signInWithGoogle = function (token_id) {
  return new Promise(function (resolve, reject) {
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
