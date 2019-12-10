const { db, storage } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')

const uploadPhoto = function (photo, userId, dest) {
  const metaData = {
    contentType: photo.mimetype
  }
  const imageRef = storage.ref().child(`${dest}/${userId}`)

  return imageRef.put(photo.buffer, metaData).then(() => {
    return imageRef.getDownloadURL()
  })
}

const saveProfile = function (profile, userId) {
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

const getProfileById = function (userId) {
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

const getProfileByNickname = function (userNickname) {
  const profilesRef = db.collection('users')

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

const setPreferences = function (preferences, userId) {
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

const getFollowersById = function (id) {
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

const followProfile = function (myUserId, followId) {
  const myProfileRef = db.collection('users').doc(myUserId)
  const followProfileRef = db.collection('users').doc(followId)

  return db
    .runTransaction(t => {
      return t.get(myProfileRef).then(docMyProfile => {
        return t.get(followProfileRef).then(docFollowProfile => {
          const followings = docMyProfile.data().followings
          const myProfileData = [
            {
              nickname: docMyProfile.data().nickname,
              avatar_url: docMyProfile.data().avatar_url,
              id: myUserId
            }
          ]
          const followers = docFollowProfile.data().followers
          const followProfileData = [
            {
              nickname: docFollowProfile.data().nickname,
              avatar_url: docFollowProfile.data().avatar_url,
              id: followId
            }
          ]
          const followSuccess = 'User succesfully followed'

          if (!followers && !followings) {
            t.update(myProfileRef, {
              followings: followProfileData
            })
            t.update(followProfileRef, {
              followers: myProfileData
            })
            return followSuccess
          }

          if (followers && !followings) {
            t.update(myProfileRef, {
              followings: followProfileData
            })
            t.update(followProfileRef, {
              followers: followers.concat(myProfileData)
            })
            return followSuccess
          }

          if (!followers && followings) {
            t.update(myProfileRef, {
              followings: followings.concat(followProfileData)
            })
            t.update(followProfileRef, { followers: myProfileData })
            return followSuccess
          }
          const followingsFiltered = followings.filter(
            following => following.id === followId
          )
          const followersFiltered = followers.filter(
            followers => followers.id === followId
          )
          if (followersFiltered.length <= 0 && followingsFiltered.length <= 0) {
            t.update(myProfileRef, {
              followings: followings.concat(followProfileData)
            })
            t.update(followProfileRef, {
              followers: followers.concat(myProfileData)
            })
            return followSuccess
          }
          {
            throw new CustomError({
              name: 'DatabaseError',
              message: 'You already follow this user',
              status: 400
            })
          }
        })
      })
    })
    .then(res => {
      return res
    })
}

const unfollowProfile = function (myUserId, followId) {
  const myProfileRef = db.collection('users').doc(myUserId)
  const followProfileRef = db.collection('users').doc(followId)

  return db
    .runTransaction(t => {
      return t.get(myProfileRef).then(docMyProfile => {
        return t.get(followProfileRef).then(docFollowUser => {
          const { followings } = docMyProfile.data()
          const { followers } = docFollowUser.data()
          const notFollowError = new CustomError({
            name: 'DatabaseError',
            message: 'You are not following this user',
            status: 400
          })
          if (followings && followers) {
            const followingsFiltered = followings.filter(
              following => following.id !== followId
            )
            const followersFiltered = followers.filter(
              followers => followers.id !== myUserId
            )
            if (
              followingsFiltered.length !== followings.length &&
              followersFiltered.length !== followers.length
            ) {
              t.update(myProfileRef, { followings: followingsFiltered })
              t.update(followProfileRef, {
                followers: followingsFiltered
              })
              return 'User succesfully unfollowed'
            } else {
              throw notFollowError
            }
          } else {
            throw notFollowError
          }
        })
      })
    })
    .then(res => {
      return res
    })
}

const blockProfile = function (myId, blockedProfileId) {
  const profileRef = db.collection('users').doc(myId)
  const blockedProfileRef = db.collection('users').doc(blockedProfileId)

  return db.runTransaction(t => {
    return t.get(profileRef).then(myProfileDocument => {
      return t.get(blockedProfileRef).then(blockedProfileDocument => {
        if (!myProfileDocument.exists) {
          throw new CustomError({
            name: 'DatabaseError',
            message: 'No profile with given id',
            status: 404
          })
        }
        const followers = myProfileDocument.data().followers
        const blockedProfiles = myProfileDocument.data().blockedProfiles
        const followings = blockedProfileDocument.data().followings
        const blockedProfileData = [
          {
            id: blockedProfileId,
            nickname: blockedProfileDocument.data().nickname,
            avatar_url: blockedProfileDocument.data().avatar_url
          }
        ]
        const successBlockMessage = 'Profile succesfully blocked'
        if (
          followers &&
          !followers.some(follower => follower.id === blockedProfileId)
        ) {
          if (blockedProfiles) {
            if (
              blockedProfiles.some(profile => profile.id === blockedProfileId)
            ) {
              throw new CustomError({
                name: 'DatabaseError',
                message: 'Profile with given id already blocked',
                status: 400
              })
            } else {
              const newBlockedProfiles = blockedProfiles.concat(
                blockedProfileData
              )
              t.update(profileRef, { blockedProfiles: newBlockedProfiles })
              t.update(blockedProfileRef, {})

              return successBlockMessage
            }
          } else {
            t.update(profileRef, { blockedProfiles: blockedProfileData })
            t.update(blockedProfileRef, {})
            return successBlockMessage
          }
        } else {
          const filteredFollowers = followers
            ? followers.filter(profile => profile.id !== blockedProfileId)
            : []
          const filteredFollowings = followings
            ? followings.filter(profile => profile.id !== myId)
            : []
          t.update(blockedProfileRef, { followings: filteredFollowings })
          if (blockedProfiles) {
            const newBlockedProfiles = blockedProfiles.concat(
              blockedProfileData
            )
            t.update(profileRef, {
              blockedProfiles: newBlockedProfiles,
              followers: filteredFollowers
            })
            return successBlockMessage
          } else {
            t.update(profileRef, {
              blockedProfiles: blockedProfileData,
              followers: filteredFollowers
            })
            return successBlockMessage
          }
        }
      })
    })
  })
}

const unblockProfile = function (myId, blockedProfileId) {
  const profileRef = db.collection('users').doc(myId)

  return profileRef.get().then(doc => {
    if (!doc.exists) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'No profile with given id',
        status: 404
      })
    }
    const blockedProfiles = doc.data().blockedProfiles

    if (
      !blockedProfiles ||
      !blockedProfiles.some(profile => profile.id === blockedProfileId)
    ) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'There is no user with given id in your blacklist',
        status: 404
      })
    }
    const newBlockedProfilesArray = blockedProfiles.filter(
      profile => profile.id !== blockedProfileId
    )

    return profileRef
      .update({ blockedProfiles: newBlockedProfilesArray })
      .then(() => {
        return 'User succesfully unblocked'
      })
  })
}

const getFollowingsById = function (profileId) {
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
  uploadPhoto
}
