const { db, storage } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')

const uploadVideo = function(video, userId, dest) {
  const metaData = {
    contentType: video.mimetype
  }
  const videoRef = storage.ref().child(`${dest}/${userId}/${Date.now()}`)
  return videoRef.put(video.buffer, metaData).then(() => {
    return videoRef.getDownloadURL()
  })
}

const savePost = function(userId, postData) {
  const { caption, videoUrl, emoji, tags } = postData
  const createdAt = Date.now()
  const userPostsRef = db.collection('users-posts').doc(userId)
  const newPostRef = db.collection('posts').doc()

  return db.runTransaction(t => {
    return t.get(userPostsRef).then(userPostsDoc => {
      return t.get(newPostRef).then(newPostDoc => {
        const newPostId = newPostRef.id
        const { nickname, posts, avatarUrl } = userPostsDoc.data()
        posts.push({
          caption,
          videoUrl,
          tags,
          createdAt,
          emoji,
          postId: newPostId,
          views: 0,
          likes: 0
        })
        t.set(newPostRef, {
          ...postData,
          createdAt,
          nickname,
          postId: newPostId,
          avatarUrl,
          userId,
          likes: 0,
          views: 0
        })
        t.update(userPostsRef, { posts, lastAction: createdAt })
        return 'Post created'
      })
    })
  })
}

const deletePost = function(userId, postId) {
  const postRef = db.collection('posts').doc(postId)
  const userPostsRef = db.collection('users-posts').doc(userId)
  return db.runTransaction(t => {
    return t.get(postRef).then(postDoc => {
      return t.get(userPostsRef).then(userPostsDoc => {
        const userIdFromPost = postDoc.data().userId
        if (userIdFromPost === userId) {
          const storageRef = storage.refFromURL(postDoc.data().videoUrl)
          const { posts } = userPostsDoc.data()
          const newPosts = posts.filter(post => post.postId !== postId)
          return storageRef.delete().then(() => {
            t.delete(postRef)
            t.update(userPostsRef, { posts: newPosts })
            return 'Post deleted'
          })
        } else {
          throw new CustomError({
            name: 'DatabaseError',
            message: 'You are not owner of this post',
            status: 401
          })
        }
      })
    })
  })
}

const editPost = function(userId, postId, postData) {
  const { caption, emoji, tags } = postData
  const postRef = db.collection('posts').doc(postId)
  const userPostsRef = db.collection('users-posts').doc(userId)
  return db.runTransaction(t => {
    t.get(postRef).then(postDoc => {
      t.get(userPostsRef).then(userPostsDoc => {
        const userIdFromPost = postDoc.data().userId
        if (userIdFromPost === userId) {
          const posts = userPostsDoc.data().posts
          posts.map(post => {
            if (post.id === postId) {
              post.caption = caption
              post.emoji = emoji
              post.tags = tags
            }
          })
          t.update(postRef, { caption, emoji, tags })
          t.update(userPostsRef, { posts })
          return 'Post edited'
        } else {
          throw new CustomError({
            name: 'DatabaseError',
            message: 'You are not owner of this post',
            status: 401
          })
        }
      })
    })
  })
}

module.exports = {
  uploadVideo,
  savePost,
  editPost,
  deletePost
}
