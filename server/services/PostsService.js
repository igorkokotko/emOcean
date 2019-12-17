const { db, storage } = require('../config/databaseConfig')

const uploadVideo = function(video, userId, dest) {
  const metaData = {
    contentType: video.mimetype
  }
  const videoRef = storage.ref().child(`${dest}/${userId}/${Date.now()}`)
  return videoRef.put(video.buffer, metaData).then(() => {
    return videoRef.getDownloadURL()
  })
}

const getPostsByViews = function(paginateId, postsCount) {
  const postsRefQuery = db
    .collection('posts')
    .orderBy('views', 'desc')
    .limit(postsCount)

  if (paginateId) {
    const paginateRef = db.collection('posts').doc(paginateId)
    return paginateRef.get().then(snapshot => {
      const next = postsRefQuery.startAfter(snapshot)

      return next.get().then(docSnapshots => {
        if (docSnapshots.docs.length > 0) {
          const lastIndex = docSnapshots.docs[docSnapshots.docs.length - 1].id
          const data = []
          docSnapshots.forEach(doc => {
            data.push(doc.data())
          })
          return { data, lastIndex }
        } else {
          return 'No more posts left'
        }
      })
    })
  } else {
    return postsRefQuery.get().then(docSnapshots => {
      const lastIndex = docSnapshots.docs[docSnapshots.docs.length - 1].id
      const data = []
      docSnapshots.forEach(doc => {
        data.push(doc.data())
      })
      return { data, lastIndex }
    })
  }
}

const getPostsByTags = function(tags, paginateId, postsCount) {
  const postsRefQuery = db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .where('tags', 'array-contains-any', tags)
    .limit(postsCount)
  if (paginateId) {
    const paginateRef = db.collection('posts').doc(paginateId)
    return paginateRef.get().then(snapshot => {
      const next = postsRefQuery.startAfter(snapshot)
      return next.get().then(docSnapshots => {
        if (docSnapshots.docs.length > 0) {
          const lastIndex = docSnapshots.docs[docSnapshots.docs.length - 1].id
          const data = []
          docSnapshots.forEach(doc => {
            data.push(doc.data())
          })
          return { data, lastIndex }
        } else {
          return 'No more posts left'
        }
      })
    })
  } else {
    return postsRefQuery.get().then(docSnapshots => {
      if (docSnapshots.docs.length > 0) {
        const lastIndex = docSnapshots.docs[docSnapshots.docs.length - 1].id
        const data = []
        docSnapshots.forEach(doc => {
          data.push(doc.data())
        })
        return { data, lastIndex }
      } else {
        return 'No more posts left'
      }
    })
  }
}

const getPostsByPreferences = function(id, paginateId, postsCount) {
  const userProfileRef = db.collection('users1').doc(id)
  const postsRefQuery = db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(postsCount)
  return userProfileRef.get().then(userDoc => {
    const { preferences } = userDoc.data()
    if (paginateId) {
      const paginateRef = db.collection('posts').doc(paginateId)
      return paginateRef.get().then(snapshot => {
        const next = postsRefQuery
          .where('tags', 'array-contains-any', preferences)
          .startAfter(snapshot)
        return next.get().then(docSnapshots => {
          if (docSnapshots.docs.length > 0) {
            const lastIndex = docSnapshots.docs[docSnapshots.docs.length - 1].id
            const data = []
            docSnapshots.forEach(doc => {
              data.push(doc.data())
            })
            return { data, lastIndex }
          } else {
            return 'No more posts left'
          }
        })
      })
    } else {
      return postsRefQuery
        .where('tags', 'array-contains-any', preferences)
        .get()
        .then(docSnapshots => {
          if (docSnapshots.docs.length > 0) {
            const lastIndex = docSnapshots.docs[docSnapshots.docs.length - 1].id
            const data = []
            docSnapshots.forEach(doc => {
              data.push(doc.data())
            })
            return { data, lastIndex }
          } else {
            return 'No more posts left'
          }
        })
    }
  })
}

const getPostsByFollowings = function(id) {
  const postsQueryRef = db
    .collection('users-posts')
    .where('followers', 'array-contains', id)
  return postsQueryRef.get().then(snapshots => {
    const posts = []
    snapshots.forEach(snap => {
      console.log(snap.data())
      posts.concat(snap.data().posts)
    })
    return posts
  })
}

module.exports = {
  uploadVideo,
  getPostsByViews,
  getPostsByFollowings,
  getPostsByTags,
  getPostsByPreferences
}
