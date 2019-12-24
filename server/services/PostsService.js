const { db, storage } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')

const uploadVideo = async (video, userId, dest) => {
  const metaData = {
    contentType: video.mimetype
  }
  const videoRef = storage.ref().child(`${dest}/${userId}/${Date.now()}`)
  await videoRef.put(video.buffer, metaData)
  return videoRef.getDownloadURL()
}

const savePost = async (userId, postData) => {
  const { caption, videoUrl, emoji, tags } = postData
  const createdAt = Date.now()
  const userPostsRef = db.collection('users-posts').doc(userId)
  const newPostRef = db.collection('posts').doc()
  const post = await db.runTransaction(async transaction => {
    const userPostsDoc = await transaction.get(userPostsRef)
    const newPostId = newPostRef.id
    const { nickname, posts, avatarUrl } = userPostsDoc.data()
    posts.push({
      caption,
      videoUrl,
      userId,
      tags,
      createdAt,
      emoji,
      postId: newPostId,
      views: 0,
      likes: [],
      likesCount: 0
    })
    transaction.set(newPostRef, {
      ...postData,
      createdAt,
      nickname,
      postId: newPostId,
      avatarUrl,
      userId,
      emoji,
      likes: [],
      likesCount: 0,
      views: 0
    })
    transaction.update(userPostsRef, { posts, lastAction: createdAt })
    return {
      ...postData,
      createdAt,
      nickname,
      postId: newPostId,
      avatarUrl,
      emoji,
      userId,
      likes: [],
      likesCount: 0,
      views: 0
    }
  })
  return post
}

const getPostsByViews = async (paginateId, postsCount) => {
  let postsRefQuery = db
    .collection('posts')
    .orderBy('views', 'desc')
    .limit(postsCount)
  if (paginateId) {
    const paginateRef = db.collection('posts').doc(paginateId)
    const postsSnapshot = await paginateRef.get()
    postsRefQuery = postsRefQuery.startAfter(postsSnapshot)
  }
  const docSnapshots = await postsRefQuery.get()
  const { length } = docSnapshots.docs
  if (length > 0) {
    const lastIndex = docSnapshots.docs[length - 1].id
    const data = []
    docSnapshots.forEach(doc => {
      data.push(doc.data())
    })
    return { data, lastIndex }
  } else {
    throw new CustomError({ name: 'Database Error', message: 'No more posts left', status: 404 })
  }
}

const getPostsByTags = async (tags, paginateId, postsCount) => {
  let postsRefQuery = db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .where('tags', 'array-contains-any', tags)
    .limit(postsCount)
  if (paginateId) {
    const paginateRef = db.collection('posts').doc(paginateId)
    const snapshot = await paginateRef.get()
    postsRefQuery = postsRefQuery.startAfter(snapshot)
  }
  const docSnapshots = await postsRefQuery.get()
  const { length } = docSnapshots.docs
  if (length > 0) {
    const lastIndex = docSnapshots.docs[length - 1].id
    const data = []
    docSnapshots.forEach(doc => {
      data.push(doc.data())
    })
    return { data, lastIndex }
  } else {
    throw new CustomError({ name: 'Database Error', message: 'No more posts left', status: 404 })
  }
}

const getPostsByPreferences = async (id, paginateId, postsCount) => {
  const userProfileRef = db.collection('users').doc(id)
  const userDoc = await userProfileRef.get()
  const { preferences } = userDoc.data()
  if (preferences.length === 0) {
    throw new CustomError({
      name: 'Bad Request',
      message: 'You don\'t have any preferences, please go to settings and pick some of them',
      status: 400
    })
  }
  let postsRefQuery = db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .where('tags', 'array-contains-any', preferences)
    .limit(postsCount)
  if (paginateId) {
    const paginateRef = db.collection('posts').doc(paginateId)
    const snapshot = await paginateRef.get()
    postsRefQuery = postsRefQuery.startAfter(snapshot)
  }
  const docSnapshots = await next.get()
  const { length } = docSnapshots.docs
  if (length > 0) {
    const lastIndex = docSnapshots.docs[length - 1].id
    const data = []
    docSnapshots.forEach(doc => {
      data.push(doc.data())
    })
    return { data, lastIndex }
  } else {
    throw new CustomError({ name: 'Database Error', message: 'No more posts left', status: 404 })
  }
}

const getPostsByFollowings = async id => {
  const postsQueryRef = db
    .collection('users-posts')
    .where('followers', 'array-contains', id)
  const snapshots = await postsQueryRef.get()
  let postsArray = []
  snapshots.forEach(snap => {
    const { nickname, posts, avatarUrl } = snap.data()
    postsArray = [
      ...postsArray,
      ...posts.map(post => {
        post.nickname = nickname
        post.avatarUrl = avatarUrl
        return post
      })
    ]
  })
  return postsArray
}

const deletePost = async (userId, postId) => {
  const postRef = db.collection('posts').doc(postId)
  const userPostsRef = db.collection('users-posts').doc(userId)
  await db.runTransaction(async t => {
    const postDoc = await t.get(postRef)
    const userPostsDoc = await t.get(userPostsRef)
    const userIdFromPost = postDoc.data().userId
    if (userIdFromPost === userId) {
      const storageRef = storage.refFromURL(postDoc.data().videoUrl)
      const { posts } = userPostsDoc.data()
      const newPosts = posts.filter(post => post.postId !== postId)
      await storageRef.delete()
      t.delete(postRef)
      t.update(userPostsRef, { posts: newPosts })
    } else {
      throw new CustomError({
        name: 'Database Error',
        message: 'You are not owner of this post',
        status: 401
      })
    }
  })
  return 'Post deleted'
}

const editPost = async (userId, postId, postData) => {
  const { caption, emoji, tags } = postData
  const postRef = db.collection('posts').doc(postId)
  const userPostsRef = db.collection('users-posts').doc(userId)
  await db.runTransaction(async t => {
    const postDoc = await t.get(postRef)
    const userIdFromPost = postDoc.data().userId
    if (userIdFromPost === userId) {
      posts.map(post => {
        if (post.id === postId) {
          post.caption = caption
          post.emoji = emoji
          post.tags = tags
        }
      })
      t.update(postRef, { caption, emoji, tags })
      t.update(userPostsRef, { posts })
    } else {
      throw new CustomError({
        name: 'Database Error',
        message: 'You are not owner of this post',
        status: 401
      })
    }
  })
  return 'Post edited'
}

const getUserPosts = async userId => {
  const userRef = db.collection('users-posts').doc(userId)
  const doc = userRef.get()
  if (!doc.exists) {
    throw new CustomError({
      name: 'DatabaseError',
      message: 'No user with given id',
      status: 404
    })
  }
  const { nickname, posts, avatarUrl } = doc.data()
  if (posts.length <= 0) {
    throw new CustomError({
      name: 'Database Error',
      message: 'This you user don\'t have any posts',
      status: 404
    })
  } else {
    return posts.map(post => {
      post.nickname = nickname
      post.avatarUrl = avatarUrl
      return post
    })
  }
}

module.exports = {
  uploadVideo,
  savePost,
  editPost,
  deletePost,
  getPostsByViews,
  getPostsByFollowings,
  getPostsByTags,
  getPostsByPreferences,
  getUserPosts
}