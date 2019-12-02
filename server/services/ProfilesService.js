const { db, storage } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')

const uploadPhoto = function (photo, userId, dest) {
  return new Promise(function (resolve, reject) {
    const metaData = {
      contentType: photo.mimetype
    }
    
    const imageRef = storage.ref().child(`${dest}/${userId}`)
    
    imageRef.put(photo.buffer, metaData).then(() => {
      imageRef.getDownloadURL().then(res => resolve(res))
        .catch(err => reject(err))
    })
      .catch(err => reject(err))
  })
}

const saveProfile = function (profile, userId) {
  return new Promise(function (resolve, reject) {
    const profilesRef = db.collection('users')
    const profileRef = db.collection('users').doc(userId)
    
    profileRef.get()
      .then(doc => {
        const prevNickname = doc.data().nickname
        // if user didn't change nickname, everything is ok
        if (prevNickname === profile.nickname) {
          profileRef.update({
            bio: profile.bio,
            status: profile.status,
            interests: profile.interests,
            avatar_url: profile.avatar_url,
            socialAccounts: profile.socialAccounts,
            user_background: profile.user_background
          }).then(() => resolve('Profile edited successfully'))
            .catch(err => reject(err))
        } else {
          // but if user changed nickname, we need to check if new nickname is unique and only then update data 
          profilesRef.where('nickname', '==', profile.nickname).get()
            .then(snapshot => {
              if (snapshot.empty) {
                profileRef.update({
                  nickname: profile.nickname,
                  bio: profile.bio,
                  status: profile.status,
                  interests: profile.interests,
                  avatar_url: profile.avatar_url,
                  socialAccounts: profile.socialAccounts,
                  user_background: profile.user_background
                }).then(() => resolve('Profile edited successfully'))
                  .catch(err => reject(err))
              } else {
                reject(new CustomError({
                  name: 'DatabaseError',
                  message: 'Nickname already taken. Try with something else',
                  status: 400
                }))
              }
            }).catch(err => reject(err))
        }
      })
      .catch(err => reject(err))
  })
}

const getProfileById = function (userId) {
  return new Promise(function (resolve, reject) {
    const profileRef = db.collection('users').doc(userId)
    
    profileRef.get()
      .then(doc => {
        if (!doc.exists) reject(new CustomError({
          name: 'DatabaseError',
          message: 'No profile with given id',
          status: 404
        }))
        else resolve(doc.data())
      })
      .catch(err => reject(err))
  })
}

const getProfileByNickname = function (userNickname) {
  return new Promise(function (resolve, reject) {
    const profilesRef = db.collection('users')
    
    profilesRef.where('nickname', '==', userNickname).get()
      .then(profile => {
        if (profile.empty) reject(new CustomError({
          name: 'DatabaseError',
          message: 'No profile with given nickname',
          status: 404
        }))
        
        profile.forEach(doc => {
          resolve(doc.data())
        })
      })
      .catch(err => reject(err))
  })
}

const setPreferences = function (preferences, userId) {
  return new Promise(function (resolve, reject) {
    const profileRef = db.collection('users').doc(userId)
    
    profileRef.get()
      .then(doc => {
        if (!doc.exists) reject(new CustomError({
          name: 'DatabaseError',
          message: 'No profile with given id',
          status: 404
        }))
        
        profileRef.update({ interests: preferences })
          .then(res => resolve('Preferences successfully set'))
          .catch(err => reject(err))
      }).catch(err => reject(err))
  })
}

const getFollowersById = function (id) {
  return new Promise(function (resolve, reject) {
    const profileRef = db.collection('users').doc(id)
    
    profileRef.get()
      .then(doc => {
        if (!doc.exists) reject(new CustomError({
          name: 'DatabaseError',
          message: 'No profile with given id',
          status: 404
        }))
        
        if (!doc.data().followers || doc.data().followers.length === 0) resolve('This profile doesnt have followers')
        
        resolve(doc.data().followers)
      })
      .catch(err => reject(err))
  })
}

const blockProfile = function (userId, blockedProfileId) {
  return new Promise(function (resolve, reject) {
    // Profile of user which wants to block someone
    const profileRef = db.collection('users').doc(userId)
    // Profile of user which would be blocked
    const blockedProfileRef = db.collection('users').doc(blockedProfileId)
    profileRef.get()
      .then(doc => {
        if (!doc.exists) reject(new CustomError({
          name: 'DatabaseError',
          message: 'No profile with given id',
          status: 404
        }))
        // Check if user which would be blocked follows our profile or not
        if (doc.data().followers && doc.data().followers.indexOf(blockedProfileId) < 0) {
          // if not follow, check if user blocked someone before 
          if (doc.data().blockedProfiles) {
            // if user already blocked than we don't need to update document
            if (doc.data().blockedProfiles.indexOf(blockedProfileId) >= 0) reject(new CustomError({
              name: 'DatabaseError',
              message: 'Profile with given id already blocked',
              status: 400
            }))
            // else we update blocked profiles array
            const newBlockedProfiles = doc.data().blockedProfiles.concat(blockedProfileId)
            
            profileRef.update({ blockedProfiles: newBlockedProfiles })
              .then(() => resolve('Profile successfully blocked'))
              .catch(err => reject(err))
          } else {
            // if user doesn't have blocked users before we update our profile with blocked array with single element 
            profileRef.update({ blockedProfiles: [blockedProfileId] })
           
            resolve('Profile successfully blocked')
          }
        } else {
          // if blocked user follows user profile we need to use transactions because
          // we need to update simultaneously blocked user profile and user which block profile
          db.runTransaction(t => {
            return t.get(profileRef)
              .then(docMy => {
                return t.get(blockedProfileRef)
                  .then(docBlockedUser => {
                    // filter user array followers and return array without blocked user id 
                    const followersWithoutBlockedUser = docMy.data().followers.filter(profileId => profileId !== blockedProfileId)
                    // filter blocked user array followings and return array without blocked user id
                    const blockedUserFollowing = docBlockedUser.data().followings.filter(profileId => profileId !== userId)

                    t.update(blockedProfileRef, { followings: blockedUserFollowing })
                    // check if user blocked someone before
                    if (docMy.data().blockedProfiles) {
                      const newBlockedProfiles = docMy.data().blockedProfiles.concat(blockedProfileId)
                      t.update(profileRef, { blockedProfiles: newBlockedProfiles, followers: followersWithoutBlockedUser })
                      
                      resolve('User succesfully blocked')
                    } else {
                      t.update(profileRef, { blockedProfiles: [blockedProfileId], followers: followersWithoutBlockedUser })
                      
                      resolve('User succesfully blocked')
                    }
                  })
              })
          })
            .then(res => resolve(res))
            .catch(err => reject(err))
        }
      })
  })
}

const unblockProfile = function (myId, blockedProfileId) {
  return new Promise(function (resolve, reject) {
    const profileRef = db.collection('users').doc(myId)

    profileRef.get().then(doc => {
      if (!doc.exists) reject(new CustomError({
        name: 'DatabaseError',
        message: 'No profile with given id',
        status: 404
      }))

      if (!doc.data().blockedProfiles || doc.data().blockedProfiles.indexOf(blockedProfileId) < 0) reject(new CustomError({
        name: 'DatabaseError',
        message: 'There is no user with given id in your blacklist',
        status: 404
      }))

      const newBlockedProfilesArray = doc.data().blockedProfiles.filter(profileId => profileId !== blockedProfileId)
      
      profileRef.update({ blockedProfiles: newBlockedProfilesArray })
      
      resolve('User succesfully unblocked')
    })
      .catch(err => reject(err))
  })
}

const getFollowingsById = function (profileId) {
  return new Promise(function (resolve, reject) {
    const profileRef = db.collection('users').doc(profileId)
    
    profileRef.get().then(doc => {
      if (!doc.exists) reject(new CustomError({
        name: 'DatabaseError',
        message: 'No profile with given id',
        status: 404
      }))

      if (!doc.data().followings || doc.data().followings.length === 0) reject(new CustomError({
        name: 'DatabaseError',
        message: 'User with given id doesnt have followings',
        status: 404
      }))

      resolve(doc.data().followings)
    })
      .catch(err => reject(err))
  })
}

const followProfile = function (myUserId, followId) {
  return new Promise(function (resolve, reject) {
    const myProfileRef = db.collection('users').doc(myUserId)
    const followProfileRef = db.collection('users').doc(followId)
    
    db.runTransaction(t => {
      return t.get(myProfileRef)
        .then(docMyProfile => {
          return t.get(followProfileRef)
            .then(docFollowUser => {
              const myFollowings = docMyProfile.data().followings
              const followProfileFollowers = docFollowUser.data().followers
              
              if (!myFollowings && !followProfileFollowers) {
                t.update(myProfileRef, { followings: [followId] })
                t.update(followProfileRef, { followers: [myUserId] })
                resolve('User succesfully followed')
              }
              
              if (!myFollowings && followProfileFollowers) {
                t.update(myProfileRef, { followings: [followId] })
                t.update(followProfileRef, { followers: followProfileFollowers.concat(myUserId) })
                resolve('User succesfully followed')
              }
             
              if (myFollowings && !followProfileFollowers) {
                t.update(myProfileRef, { followings: myFollowings.concat(followId) })
                t.update(followProfileRef, { followers: [myUserId] })
                resolve('User succesfully followed')
              }
             
              if (myFollowings.indexOf(followId) < 0 && followProfileFollowers.indexOf(myUserId) < 0) {
                t.update(myProfileRef, { followings: myFollowings.concat(followId) })
                t.update(followProfileRef, { followers: followProfileFollowers.concat(myUserId) })
                resolve('User succesfully followed')
              }
             
              reject(new CustomError({
                name: 'DatabaseError',
                message: 'You already follow this user',
                status: 400
              }))
            })
        })
    }).then(res => resolve(res))
      .catch(err => reject(err))
  })
}

const unfollowProfile = function (myUserId, followId) {
  return new Promise(function (resolve, reject) {
    const myProfileRef = db.collection('users').doc(myUserId)
    const followProfileRef = db.collection('users').doc(followId)
    
    db.runTransaction(t => {
      return t.get(myProfileRef)
        .then(docMyProfile => {
          return t.get(followProfileRef)
            .then(docFollowUser => {
              const myFollowings = docMyProfile.data().followings
              const followProfileFollowers = docFollowUser.data().followers
              
              if (myFollowings &&
                followProfileFollowers &&
                myFollowings.indexOf(followId) >= 0 &&
                followProfileFollowers.indexOf(myUserId) >= 0) {
                const filteredMyFollowing = myFollowings.filter(profileId => profileId !== followId)
                const filtetedFollowProfileFollowers = followProfileFollowers.filter(profileId => profileId !== myUserId)
                t.update(myProfileRef, { followings: filteredMyFollowing })
                t.update(followProfileRef, { followers: filtetedFollowProfileFollowers })
                
                resolve('User succesfully unfollowed')
              } else {
                reject(new CustomError({
                  name: 'DatabaseError',
                  message: 'You are not following this user',
                  status: 400
                }))
              }
            })
            .catch(err => {
              reject(err)
            })
        })
    }).then(res => resolve(res))
      .catch(err => {
        reject(err)
      })
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