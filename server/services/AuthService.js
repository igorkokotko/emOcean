const { db, auth } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')
const nicknameKeywords = require('../common/nicknameKeywords')

const createUserWithEmailAndPassword = (email, password, nickname) => {
  const userProfilesRef = db.collection('users')
  const usersPostsRef = db.collection('users-posts')
  return userProfilesRef
    .where('nickname', '==', nickname)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        const keywords = nicknameKeywords.setKeywords(nickname)
        return auth()
          .createUserWithEmailAndPassword(email, password)
          .then(({ user }) => {
            const batch = db.batch()
            const userId = user.uid
            const singleUserRef = userProfilesRef.doc(userId)
            const singleUserPostsRef = usersPostsRef.doc(userId)
            batch.set(singleUserRef, {
              nickname,
              email,
              userId,
              avatarUrl: '',
              backgroundUrl: '',
              preferences: [],
              followingsCount: 0,
              followersCount: 0,
              followingsId: [],
              blockedProfiles: [],
              keywords
            })
            batch.set(singleUserPostsRef, {
              nickname,
              avatarUrl: '',
              followers: [userId],
              posts: []
            })
            return batch.commit().then(() => {
              return 'User successfully added'
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
      return { uid: user.uid, email: user.email }
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
      return { uid: user.uid, email: user.email }
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
