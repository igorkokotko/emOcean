const { db, storage } = require('../config/databaseConfig')

const uploadVideo = function (video, userId, dest) {
  const metaData = {
    contentType: video.mimetype
  }
  const videoRef = storage.ref().child(`${dest}/${userId}/${Date.now()}`)
  return videoRef.put(video.buffer, metaData).then(() => {
    return videoRef.getDownloadURL()
  })
}

const updateLikes = function (postId, userId) {
  const postRef = db.collection('posts').doc(postId)

  return db
    .runTransaction(t => {
      return t.get(postRef).then(docPost => {
        const postOwnerId = docPost.data().userId
        const userPostsRef = db.collection('users-posts').doc(postOwnerId)
        return t.get(userPostsRef).then(userPostsDoc => {
          const {
            likes,
            likesCount
          } = docPost.data()
          const {
            posts,
            likedPosts
          } = userPostsDoc.data().posts

          if (likedPosts.includes(postId) && likes.includes(userId)) {
            // dislike
            t.update(userPostsRef, {
              likedPosts: likedPosts.filter(like => like !== postId),
              posts: posts.map(post => {
                if (post.postId === postId) {
                  post.likes--
                }
                return post
              })
            })

            t.update(postRef, {
              likes: likes.filter(like => like !== userId),
              likesCount: --likesCount
            })
            return 'dislike'
          } else {
            // like
            t.update(userPostsRef, {
              likedPosts: likedPosts.push(postId),
              posts: posts.map(post => {
                if (post.postId === postId) {
                  post.likes++
                }
                return post
              })
            })

            t.update(postRef, {
              likes: likes.push(userId),
              likesCount: ++likesCount
            })
            return 'like'
          }
        })
      })
    })
    .then(res => {
      return res
    })
}

const incrementViewsCounter = function (postId, userId) {
  const postRef = db.collection('posts').doc(postId)

  return db.runTransaction(t => {
      return t.get(postRef).then(docPost => {
        const postOwnerId = docPost.data().userId
        const userPostsRef = db.collection('users-posts').doc(postOwnerId)
        return t.get(userPostsRef).then(userPostsDoc => {
          const ownerPosts = userPostsDoc.data().posts
          const views = docPost.data().views || 0
          views++
          t.update(postRef, {
            views: views
          })
          t.update(userPostsDoc, {
            posts: ownerPosts.map(post => {
              if (post.postId === postId) {
                post.views = views
              }
              return post
            })
          })
          return views
        })
      })
    })
    .then(res => {
      return res
    })
}

const getUserLikedPosts = async function (userId) {
  const userRef = db.collection('users-posts').doc(userId)

  return userRef.get().then(doc => {
    if (!doc.exists) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'No user with given id',
        status: 404
      })
    }
    const postsId = doc.data().likedPosts || []
    return postsId
  })
}

const getPostInfo = function (postId) {
  const postRef = db.collection('posts').doc(postId)

  return postRef.get().then(doc => {
    if (!doc.exists) {
      throw new CustomError({
        name: 'DatabaseError',
        message: 'No post with given id',
        status: 404
      })
    }

    const info = doc.data() || []
    return info
  })
}
const getPostsByEmoji = async (emoji, paginateId, postsCount) => {
  let postsRefQuery = db
    .collection('posts1')
    .orderBy('createdAt', 'desc')
    .where('emoji', '==', emoji)
    .limit(postsCount)

  if (paginateId) {
    const paginadeDocRef = db.collection('posts1').doc(paginateId)
    const snapshot = await paginadeDocRef.get()
    postsRefQuery = postsRefQuery.startAfter(snapshot)
  }
  const docSnapshots = await postsRefQuery.get()
  const {
    length
  } = docSnapshots.docs
  if (length > 0) {
    const lastIndex = docSnapshots.docs[length - 1].id
    const data = []
    docSnapshots.forEach(doc => {
      data.push(doc.data())
    })
    return {
      data,
      lastIndex
    }
  } else {
    return 'No more posts left'
  }
}

module.exports = {
  uploadVideo,
  updateLikes,
  incrementViewsCounter,
  getUserLikedPosts,
  getPostInfo,
  getPostsByEmoji
}
