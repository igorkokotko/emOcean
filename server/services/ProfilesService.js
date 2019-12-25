const { db, storage } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')

const uploadPhoto = async (photo, userId, dest) => {
  const metaData = {
    contentType: photo.mimetype
  }
  const imageRef = storage.ref().child(`${dest}/${userId}`)
  await imageRef.put(photo.buffer, metaData)
  return await imageRef.getDownloadURL()
}

const saveProfile = async (profile, userId) => {
  const profilesRef = db.collection('users')
  const profileRef = db.collection('users').doc(userId)
  const userPostsRef = db.collection('users-posts').doc(userId)

  const doc = await profileRef.get()
  const prevNickname = doc.data().nickname
  const prevAvatar = doc.data().avatarUrl
  // As you ask me what's a point to do almost similar updates, let me a try to explain my logic
  // As profile nickname must be unique, firstly we need to check if user changed it.
  // If user didn't change it, we dont need to do additional actions like nickname checking and we could update it initially
  // Btw added avatar checking as you ask
  if (prevNickname === profile.nickname) {
    await db.runTransaction(async t => {
      t.update(profileRef, {
        bio: profile.bio,
        status: profile.status,
        avatarUrl: profile.avatarUrl,
        socialAccounts: profile.socialAccounts,
        backgroundUrl: profile.backgroundUrl
      })
      if (prevAvatar !== profile.avatarUrl) {
        t.update(userPostsRef, { avatarUrl: profile.avatarUrl })
      }
    })
    return 'Profile saved successfully'
  } else {
    const snapshot = await profilesRef
      .where('nickname', '==', profile.nickname)
      .get()
    if (snapshot.empty) {
      await db.runTransaction(async t => {
        t.update(profileRef, {
          nickname: profile.nickname,
          bio: profile.bio,
          status: profile.status,
          avatarUrl: profile.avatarUrl,
          socialAccounts: profile.socialAccounts,
          backgroundUrl: profile.backgroundUrl
        })
        if (prevAvatar !== profile.avatarUrl) {
          t.update(userPostsRef, {
            nickname: profile.nickname,
            avatarUrl: profile.avatarUrl
          })
        } else {
          t.update(userPostsRef, {
            nickname: profile.nickname
          })
        }
      })
      return 'Profile saved successfully'
    } else {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'Nickname already taken. Try with something else',
        status: 400
      })
    }
  }
}

const getProfileById = async userId => {
  const profileRef = db.collection('users').doc(userId)
  const doc = await profileRef.get()
  if (!doc.exists) {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'No profile with given id',
      status: 404
    })
  } else {
    return doc.data()
  }
}

const getProfileByNickname = async userNickname => {
  const profilesRef = db
    .collection('users')
    .where('nickname', '==', userNickname)
  const profile = await profilesRef.get()
  if (profile.empty) {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'No profile with given nickname',
      status: 404
    })
  }
  return profile.docs[0].data()
}

const setPreferences = async (preferences, userId) => {
  const profileRef = db.collection('users').doc(userId)
  const doc = await profileRef.get()
  if (!doc.exists) {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'No profile with given id',
      status: 404
    })
  }
  await profileRef.update({ preferences })
  return 'Preferences successfully set'
}

const followProfile = async (myId, followId) => {
  if (myId === followId) {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'You can\'t follow yourself',
      status: 400
    })
  }
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
  await db.runTransaction(async t => {
    const myProfileDoc = await t.get(myProfileRef)
    const followProfileDoc = await t.get(followProfileRef)
    const myFollowingsDoc = await t.get(myProfileFollowingsRef)
    const followProfileFollowersDoc = await t.get(followProfileFollowersRef)
    const userPostsDoc = await t.get(userPostsRef)
    const { followingsId } = myProfileDoc.data()
    if (
      myFollowingsDoc.exists &&
      followProfileFollowersDoc.exists &&
      followingsId.includes(followId)
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
      const newFollowersCount = followProfileDoc.data().followersCount + 1
      const newFollowingsCount = myProfileDoc.data().followingsCount + 1
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
    }
  })
  return 'User succesfully followed'
}

const unfollowProfile = async (myId, followId) => {
  if (myId === followId) {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'You can\'t unfollow yourself',
      status: 400
    })
  }
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
  const result = await db.runTransaction(async t => {
    const myProfileDoc = await t.get(myProfileRef)
    const followProfileDoc = await t.get(followProfileRef)
    const myFollowingsDoc = await t.get(myProfileFollowingsRef)
    const followProfileFollowersDoc = await t.get(followProfileFollowersRef)
    const userPostsDoc = await t.get(userPostsRef)
    if (!myFollowingsDoc.exists || !followProfileFollowersDoc.exists) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'You are not following this user',
        status: 400
      })
    } else {
      const followers = userPostsDoc.data().followers.filter(id => id !== myId)
      const followingsId = myProfileDoc
        .data()
        .followingsId.filter(id => id !== followId)

      const newFollowersCount = followProfileDoc.data().followersCount - 1
      const newFollowingsCount = myProfileDoc.data().followingsCount - 1
      t.update(myProfileRef, {
        followingsCount: newFollowingsCount,
        followingsId
      })
      t.update(followProfileRef, {
        followersCount: newFollowersCount
      })
      t.delete(myProfileFollowingsRef)
      t.delete(followProfileFollowersRef)
      t.update(userPostsRef, { followers })
      return 'User succesfully unfollowed'
    }
  })
  return result
}


const blockProfile = async (myId, blockedId) => {
  if (myId === blockedId) {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'You can\'t block yourself',
      status: 400
    })
  }
  const myProfileRef = db.collection('users').doc(myId)
  const blockedProfileRef = db.collection('users').doc(blockedId)
  const myPostsRef = db.collection('users-posts').doc(myId)
  const myFollowersRef = db
    .collection('users')
    .doc(myId)
    .collection('followers')
    .doc(blockedId)
  const blockedFollowingsRef = db
    .collection('users')
    .doc(blockedId)
    .collection('followings')
    .doc(myId)
  await db.runTransaction(async t => {
    const myProfileDoc = await t.get(myProfileRef)
    const blockedProfileDoc = await t.get(blockedProfileRef)
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
      }
    }
    const myPostsDoc = await t.get(myPostsRef)
    const newFollowingsIdArray = followingsId.filter(id => id !== myId)
    const newFollowersArray = myPostsDoc
      .data()
      .followers.filter(id => id !== blockedId)
    const newFollowingsCount = blockedProfileDoc.data().followingsCount - 1
    const newFollowersCount = myProfileDoc.data().followersCount - 1

    t.update(myProfileRef, { followersCount: newFollowersCount })
    t.update(blockedProfileRef, {
      followingsId: newFollowingsIdArray,
      followingsCount: newFollowingsCount
    })
    t.update(myPostsRef, { followers: newFollowersArray })
    t.delete(blockedFollowingsRef)
    t.delete(myFollowersRef)
  })
  return 'User successfully blocked'
}

const unblockProfile = async (myId, blockedProfileId) => {
  if (myId === blockedProfileId) {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'You can\'t unblock yourself',
      status: 400
    })
  }
  const myProfileRef = db.collection('users').doc(myId)
  const myProfileDoc = await myProfileRef.get()
  const { blockedProfiles } = myProfileDoc.data()
  if (blockedProfiles.includes(blockedProfileId)) {
    const newBlockedProfiles = blockedProfiles.filter(
      id => id !== blockedProfileId
    )
    await myProfileRef.update({ blockedProfiles: newBlockedProfiles })
    return 'User succesfully unblocked'
  } else {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'No blocked profile with given id',
      status: 404
    })
  }
}

const getSubscriptionsById = async (type, profileId, usersLimit, paginationId) => {
  const profilesRef = db.collection('users')
  let subscriptionsQueryRef = db
    .collection('users')
    .doc(profileId)
    .collection(type)
    .limit(usersLimit)
    .orderBy('actionDate', 'desc')

  if (paginationId) {
    const paginateRef = db.collection('users').doc(profileId)
    const snapshot = await paginateRef.get()
    subscriptionsQueryRef = subscriptionsQueryRef.startAfter(snapshot)
  }
  const docSnapshots = await subscriptionsQueryRef.get()
  const { length } = docSnapshots.docs
  if (length > 0) {
    const lastIndex =
      length >= usersLimit
        ? docSnapshots.docs[length - 1].id
        : 'Last query'
    const profiles = []
    for (doc of docSnapshots.docs) {
      const profileDoc = await profilesRef.doc(doc.id).get()
      profiles.push(profileDoc.data())
    }
    return { data: profiles, lastIndex }
  } else {
    return 'No more users left'
  }
}

module.exports = {
  saveProfile,
  setPreferences,
  getProfileById,
  blockProfile,
  unblockProfile,
  followProfile,
  unfollowProfile,
  getProfileByNickname,
  uploadPhoto,
  getSubscriptionsById
}
