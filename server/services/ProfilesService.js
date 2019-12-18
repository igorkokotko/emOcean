const { db, storage } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')

const uploadPhoto = function(photo, userId, dest) {
  const metaData = {
    contentType: photo.mimetype
  }
  const imageRef = storage.ref().child(`${dest}/${userId}`)

  return imageRef.put(photo.buffer, metaData).then(() => {
    return imageRef.getDownloadURL()
  })
}

const saveProfile = function(profile, userId) {
  const profilesRef = db.collection('users')
  const profileRef = db.collection('users').doc(userId)

  return profileRef.get().then(doc => {
    const prevNickname = doc.data().nickname
    if (prevNickname === profile.nickname) {
      return profileRef
        .update({
          bio: profile.bio,
          status: profile.status,
          interests: profile.interests,
          avatar_url: profile.avatar_url,
          socialAccounts: profile.socialAccounts,
          user_background: profile.user_background
        })
        .then(() => {
          return 'Profile edited successfully'
        })
    } else {
      return profilesRef
        .where('nickname', '==', profile.nickname)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            return profileRef
              .update({
                nickname: profile.nickname,
                bio: profile.bio,
                status: profile.status,
                interests: profile.interests,
                avatar_url: profile.avatar_url,
                socialAccounts: profile.socialAccounts,
                user_background: profile.user_background
              })
              .then(() => {
                return 'Profile edited successfully'
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
  })
}

const getProfileById = function(userId) {
  const profileRef = db.collection('users').doc(userId)

  return profileRef.get().then(doc => {
    if (!doc.exists) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'No profile with given id',
        status: 404
      })
    }
    return doc.data()
  })
}

const getProfileByNickname = function(userNickname) {
  const profilesRef = db.collection('users')
  let profile
  return profilesRef
    .where('nickname', '==', userNickname)
    .get()
    .then(profile => {
      if (profile.empty) {
        throw new CustomError({
          name: 'DatabaseError',
          message: 'No profile with given nickname',
          status: 404
        })
      }
      let profileData
      profile.forEach(doc => {
        profileData = doc.data()
      })
      return profileData
    })
}

const setPreferences = function(preferences, userId) {
  const profileRef = db.collection('users').doc(userId)

  return profileRef.get().then(doc => {
    if (!doc.exists) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'No profile with given id',
        status: 404
      })
    }

    return profileRef.update({ interests: preferences }).then(() => {
      return 'Preferences successfully set'
    })
  })
}

const getFollowersById = function(id) {
  const profileRef = db.collection('users').doc(id)

  return profileRef.get().then(doc => {
    if (!doc.exists) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'No profile with given id',
        status: 404
      })
    }
    const followers = doc.data().followers
    if (!followers || followers.length === 0) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'This profile doesnt have followers',
        status: 404
      })
    }
    return followers
  })
}

const getFollowingsById = function(profileId) {
  const profileRef = db.collection('users').doc(profileId)

  return profileRef.get().then(doc => {
    if (!doc.exists) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'No profile with given id',
        status: 404
      })
    }
    const followings = doc.data().followings
    if (!followings || followings.length === 0) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'User with given id doesnt have followings',
        status: 404
      })
    }
    return followings
  })
}

const followProfile = function(myId, followId) {
  const myProfileRef = db.collection('users').doc(myId)
  const myProfileFollowingsRef = db
    .collection('users')
    .doc(myId)
    .collection('followings')
    .doc(followId)
  const followProfileRef = db.collection('users').doc(followId)
  const followProfileFollowersRef = db
    .collection('users')
    .doc(followId)
    .collection('followers')
    .doc(myId)

  const userPostsRef = db.collection('users-posts1').doc(followId)

  return db.runTransaction(t => {
    return t.get(myProfileRef).then(myProfileDoc => {
      return t.get(followProfileRef).then(followProfileDoc => {
        return t.get(myProfileFollowingsRef).then(myFollowingsDoc => {
          return t
            .get(followProfileFollowersRef)
            .then(followProfileFollowersDoc => {
              return t.get(userPostsRef).then(userPostsDoc => {
                if (
                  myFollowingsDoc.exists &&
                  followProfileFollowersDoc.exists
                ) {
                  throw new CustomError({
                    name: 'DatabaseError',
                    message: 'You already follow this user',
                    status: 400
                  })
                } else {
                  const { followers } = userPostsDoc.data()
                  followers.push(myId)
                  const { followingsId } = myProfileDoc.data()
                  followingsId.push(followId)

                  const actionDate = Date.now()

                  const newFollowersCount =
                    followProfileDoc.data().followersCount + 1
                  const newFollowingsCount =
                    myProfileDoc.data().followingsCount + 1
                  t.update(myProfileRef, {
                    followingsCount: newFollowingsCount,
                    followingsId
                  })
                  t.update(followProfileRef, {
                    followersCount: newFollowersCount
                  })
                  t.set(myProfileFollowingsRef, { id: followId, actionDate })
                  t.set(followProfileFollowersRef, { id: myId, actionDate })
                  t.update(userPostsRef, { followers })
                  return 'User succesfully followed'
                }
              })
            })
        })
      })
    })
  })
}

const unfollowProfile = function(myId, followId) {
  const myProfileRef = db.collection('users').doc(myId)
  const myProfileFollowingsRef = db
    .collection('users')
    .doc(myId)
    .collection('followings')
    .doc(followId)
  const followProfileRef = db.collection('users').doc(followId)
  const followProfileFollowersRef = db
    .collection('users')
    .doc(followId)
    .collection('followers')
    .doc(myId)
  const userPostsRef = db.collection('users-posts').doc(followId)

  return db.runTransaction(t => {
    return t.get(myProfileRef).then(myProfileDoc => {
      return t.get(followProfileRef).then(followProfileDoc => {
        return t.get(myProfileFollowingsRef).then(myFollowingsDoc => {
          return t
            .get(followProfileFollowersRef)
            .then(followProfileFollowersDoc => {
              return t.get(userPostsRef).then(userPostsDoc => {
                if (
                  !myFollowingsDoc.exists ||
                  !followProfileFollowersDoc.exists
                ) {
                  throw new CustomError({
                    name: 'DatabaseError',
                    message: 'You are not following this user',
                    status: 400
                  })
                } else {
                  const followers = userPostsDoc
                    .data()
                    .followers.filter(id => id !== myId)
                  const followingsId = myProfileDoc
                    .data()
                    .followingsId.filter(id => id !== followId)

                  const newFollowersCount =
                    myProfileDoc.data().followersCount - 1
                  const newFollowingsCount =
                    followProfileDoc.data().followingsCount - 1

                  t.update(myProfileRef, {
                    followersCount: newFollowersCount,
                    followingsId
                  })
                  t.update(followProfileRef, {
                    followingsCount: newFollowingsCount
                  })
                  t.delete(myProfileFollowingsRef)
                  t.delete(followProfileFollowersRef)
                  t.update(userPostsRef, { followers })
                  return 'User succesfully unfollowed'
                }
              })
            })
        })
      })
    })
  })
}

const blockProfile = function(myId, blockedId) {
  const myProfileRef = db.collection('users').doc(myId)
  const myFollowersRef = db
    .collection('users')
    .doc(myId)
    .collection('followers')
    .doc(blockedId)
  const myPostsRef = db.collection('users-posts1').doc(myId)

  const blockedProfileRef = db.collection('users').doc(blockedId)
  const blockedFollowingsRef = db
    .collection('users')
    .doc(blockedId)
    .collection('followings')
    .doc(myId)

  return db.runTransaction(t => {
    return t.get(myProfileRef).then(myProfileDoc => {
      return t.get(blockedProfileRef).then(blockedProfileDoc => {
        const { blockedProfiles } = myProfileDoc.data()
        const { followingsId } = blockedProfileDoc.data()
        if (blockedProfiles.includes(blockedId)) {
          throw new CustomError({
            name: 'DatabaseError',
            message: 'You already blocked this user',
            status: 404
          })
        } else {
          if (!followingsId.includes(myId)) {
            t.update(myProfileRef, {
              blockedProfiles: [...blockedProfiles, blockedId]
            })
            t.update(blockedProfileRef, { followingsId })
            return 'User successfully blocked'
          } else {
            return t.get(myFollowersRef).then(myFollowersDoc => {
              return t.get(blockedFollowingsRef).then(blockedFollowingsDoc => {
                return t.get(myPostsRef).then(myPostsDoc => {
                  const newFollowingsIdArray = followingsId.filter(
                    id => id !== myId
                  )
                  const newFollowersArray = myPostsDoc
                    .data()
                    .followers.filter(id => id !== blockedId)
                  const newFollowingsCount =
                    blockedProfileDoc.data().followingsCount - 1
                  const newFollowersCount =
                    myProfileDoc.data().followersCount - 1

                  t.update(myProfileRef, { followersCount: newFollowersCount })
                  t.update(blockedProfileRef, {
                    followingsId: newFollowingsIdArray,
                    followingsCount: newFollowingsCount
                  })
                  t.update(myPostsRef, { followers: newFollowersArray })
                  t.delete(blockedFollowingsRef)
                  t.delete(myFollowersRef)
                  return 'User successfully blocked'
                })
              })
            })
          }
        }
      })
    })
  })
}

const unblockProfile = function(myId, blockedProfileId) {
  const myProfileRef = db.collection('users').doc(myId)

  return myProfileRef.get().then(myProfileDoc => {
    const { blockedProfiles } = myProfileDoc.data()
    if (blockedProfiles.includes(blockedProfileId)) {
      const newBlockedProfiles = blockedProfiles.filter(
        id => id !== blockedProfileId
      )
      return myProfileRef
        .update({ blockedProfiles: newBlockedProfiles })
        .then(() => {
          return 'User succesfully unblocked'
        })
    } else {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'No blocked profile with given id',
        status: 404
      })
    }
  })
}

const deleteAccount = function (userId) {
  const userProfile = db.collection('users').doc(userId).delete()
  userProfile
    .then(() => {
      return 'User succesfully deleted'
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  saveProfile,
  getFollowingsById,
  setPreferences,
  getProfileById,
  blockProfile,
  unblockProfile,
  followProfile,
  unfollowProfile,
  getProfileByNickname,
  getFollowersById,
  uploadPhoto,
  deleteAccount
}
