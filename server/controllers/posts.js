const asyncMiddleware = require('../middleware/asyncMiddleware')
const postsService = require('../services/PostsService')
const VideoHandler = require('../videoHandling/videoHandler')
const clearTempFiles = require('../common/clearTempFiles')

// @desc    Handling and uploading video to database
// @route   POST /api/posts/upload-videos?type=single-video
// @route   POST /api/posts/upload-videos?type=two-videos
// @route   POST /api/posts/upload-videos?type=video-and-audio
// @access  Private
const uploadVideos = asyncMiddleware(async (req, res) => {
  const { type } = req.query
  const media = req.files
  const id = req.userId
  const videoHandler = new VideoHandler(media, type, id)
  videoHandler
    .apply()
    .then(videoUrl => {
      res.status(200).json({ videoUrl })
    })
    .finally(() => {
      clearTempFiles('uploads', id)
    })
})

// @desc    Save post to database
// @route   POST /api/posts/save-post
// @access  Private
const savePost = asyncMiddleware(async (req, res) => {
  const id = req.userId
  const postData = req.body
  const result = await postsService.savePost(id, postData)
  res.status(200).json({ result })
})

// @desc    Get most popular posts with pagination
// @route   GET /api/posts/by-views
// @route   GET /api/posts/by-views?index=qzmHM8GdAYWlgsrF9ZvZXXh8UK93
// @access  Public
const getPostsByViews = asyncMiddleware(async (req, res) => {
  const index = req.query.index
  const postsLimit = 5
  const result = await postsService.getPostsByViews(index, postsLimit)
  res.status(200).json({ result })
})

// @desc    Get posts based on requested tag list(from 1 to 10)
// @route   GET /api/posts/by-tags?tags
// @access  Public
const getPostsByTags = asyncMiddleware(async (req, res, next) => {
  const tags = req.query.tags.split('-')
  if (!tags || tags.length === 0) {
    return next(new CustomError({ name: 'Bad Request', message: 'Tags query is empty', status: 400 }))
  }
  const paginateId = req.query.index
  const postsLimit = 5
  const result = await postsService.getPostsByTags(tag, paginateId, postsLimit)
  res.status(200).json({ result })
})

// @desc    Get posts based on user followings
// @route   GET /api/posts/by-followings
// @access  Private
const getPostsByFollowings = asyncMiddleware(async (req, res) => {
  const userId = req.userId
  const paginateId = req.query.index
  const postsLimit = 5
  const result = await postsService.getPostsByFollowings(
    userId,
    paginateId,
    postsLimit
  )
  res.status(200).json({ result })
})

// @desc    Get posts based on user preferences
// @route   GET /api/posts/by-preferences
// @access  Private
const getPostsByPreferences = asyncMiddleware(async (req, res) => {
  const userId = req.userId
  const paginateId = req.query.index
  const postsLimit = 5

  const result = await postsService.getPostsByPreferences(
    userId,
    paginateId,
    postsLimit
  )
  res.status(200).json({ result })
})

const getPostsByType = asyncMiddleware(async (req, res, next) => {
  const typesList = ['search', 'preferences', 'followings', 'popular']
  const { type } = req.query
  const paginateId = req.query.index
  const postsLimit = 5
  let value
  if (typesList.includes(type)) {
    const postsActions = {
      search: 'getPostsByTags',
      preferences: 'getPostsByPreferences',
      popular: 'getPostsByViews',
      followings: 'getPostsByFollowings'
    }
    const postMethod = postsActions[type]
    if (type === 'preferences' || 'followings') {
      value = jwt.verify(token, process.env.JWT_SECRET).value.uid
    }
    if (type === 'search') {
      value = req.query.tags
    }
    const result = await postsService[postMethod](paginateId, postsLimit, value)

    res.status(200).json({ result })
  } else {
    return next(
      new CustomError({
        name: 'Bad Request',
        message: 'Invalid query request',
        status: 400
      })
    )
  }
})

// @desc    Delete post by Id
// @route   DELETE /api/posts/delete-post/:postId
// @route   DELETE /api/posts/delete-post/qzmHM8GdAYWlgsrF9ZvZXXh8UK93
// @access  Private
const deletePost = asyncMiddleware(async (req, res) => {
  const userId = req.userId
  const { postId } = req.params
  const result = await postsService.deletePost(userId, postId)
  res.status(200).json({ result })
})

// @desc    Edit post by Id
// @route   PUT /api/posts/edit-post/:postId
// @route   PUT /api/posts/edit-post/qzmHM8GdAYWlgsrF9ZvZXXh8UK93
// @access  Private
const editPost = asyncMiddleware(async (req, res) => {
  const userId = req.userId
  const { postId } = req.params
  const { postData } = req.body
  const result = await postsService.editPost(userId, postId, postData)
  res.status(200).json({ result })
})

// @desc    Get posts by id
// @route   GET /api/posts/get-user-posts?id
// @route   GET /api/posts/get-user-posts?id=qzmHM8GdAYWlgsrF9ZvZXXh8UK93
// @access  Public
const getUserPosts = asyncMiddleware(async (req, res) => {
  const { id } = req.query
  const posts = await postsService.getUserPosts(id)
  res.status(200).json({
    result: posts
  })
})

const updateLikes = asyncMiddleware(async (req, res) => {
  const postId = req.params.postId
  const id = req.userId
  const result = await postsService.updateLikes(postId, id)
  res.status(200).json({
    result
  })
})

const incrementViewsCounter = asyncMiddleware(async (req, res) => {
  const post_id = req.params.postId
  const result = await postsService.incrementViewsCounter(post_id)
  res.status(200).json({
    result
  })
})

const getPostLikes = asyncMiddleware(async (req, res, next) => {
  const post_id = req.params.postId
  const users_ids = await postsService.getPostLikes(post_id)

  const users = []
  for (let i = 0; i < users_ids.length; i++) {
    const userInfo = await profilesService.getProfileById(users_ids[i])
    users.push(userInfo)
  }

  res.status(200).json({
    result: users
  })
})

const getUserLikedPosts = asyncMiddleware(async (req, res) => {
  const {
    id
  } = req.query
  const postsId = await postsService.getUserLikedPosts(id)

  const posts = []
  for (let i = 0; i < postsId.length; i++) {
    const post = await postsService.getPostInfo(postsId[i])
    posts.push(post)
  }
  res.status(200).json({
    result: posts
  })
})

const getPostsByEmoji = asyncMiddleware(async (req, res) => {
  const {
    emoji,
    index,
  } = req.query

  const postsLimit = 5
  const posts = await postsService.getPostsByEmoji(emoji, index, postsLimit)

  res.status(200).json({
    result: posts
  })
})

module.exports = {
  savePost,
  deletePost,
  editPost,
  uploadVideos,
  searchPosts,
  updateLikes,
  incrementViewsCounter,
  getPostLikes,
  getUserLikedPosts,
  getPostsByEmoji,
  getUserPosts,
  getPostsByType
}
