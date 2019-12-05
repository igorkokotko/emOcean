const { db, auth } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')
const nicknameKeywords = require('../common/nicknameKeywords')

const createUserWithEmailAndPassword = (email, password, nickname) => {
  const usersRef = db.collection('users')
  const avatarUrl =
    'https://firebasestorage.googleapis.com/v0/b/emocean-74133.appspot.com/o/avatars%2Fno-profile-image.png?alt=media&token=f5825834-7e53-46e7-becd-f14559a73e331'
  return usersRef
    .where('nickname', '==', nickname)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        const keywords = nicknameKeywords.setKeywords(nickname)
        return auth()
          .createUserWithEmailAndPassword(email, password)
          .then(({ user }) => {
            return usersRef
              .doc(user.uid)
              .set({
                nickname,
                profile_id: user.uid,
                avatar_url: avatarUrl,
                keywords
              })
              .then(() => {
                return 'User created'
              })
          })
      } else {
        {
          throw new CustomError({
            name: 'DatabaseError',
            message: 'Nickname already taken. Try with something else',
            status: 400
          })
        }
      }
    })
}

const loginWithEmailAndPassword = function(email, password) {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user
    })
}

const changePassword = function(oldPassword, newPassword, email) {
  const credential = auth.EmailAuthProvider.credential(email, oldPassword)
  return auth()
    .signInWithCredential(credential)
    .then(() => {
      return auth()
        .currentUser.updatePassword(newPassword)
        .then(() => {
          return 'Password changed'
        })
    })
}

const sendPasswordResetCode = function(email) {
  auth().useDeviceLanguage()
  return auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      return 'Email sent'
    })
}

const resetPassword = function(actionCode, newPassword) {
  auth().useDeviceLanguage()
  return auth()
    .confirmPasswordReset(actionCode, newPassword)
    .then(() => {
      return 'You can now sign in with your new password'
    })
}

const signInWithGoogle = function(token_id) {
  const credential = auth.GoogleAuthProvider.credential(token_id)
  return auth()
    .signInWithCredential(credential)
    .then(({ user }) => {
      return user
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
