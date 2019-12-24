const asyncMiddleware = require('../middleware/asyncMiddleware')
const postsService = require('../services/PostsService')
const VideoHandler = require('../videoHandling/videoHandler')
const clearTempFiles = require('../common/clearTempFiles')
const CustomError = require('../common/CustomError')
const searchService = require('../services/SearchService')

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
  const postsLimit = 10
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
  const postsLimit = 10
  const result = await postsService.getPostsByTags(tag, paginateId, postsLimit)
  res.status(200).json({ result })
})

// @desc    Get posts based on user followings
// @route   GET /api/posts/by-followings
// @access  Private
const getPostsByFollowings = asyncMiddleware(async (req, res) => {
  const userId = req.userId
  const paginateId = req.query.index
  const result = await postsService.getPostsByFollowings(
    userId,
    paginateId
  )
  res.status(200).json({ result })
})

// @desc    Get posts based on user preferences
// @route   GET /api/posts/by-preferences
// @access  Private
const getPostsByPreferences = asyncMiddleware(async (req, res) => {
  const userId = req.userId
  const paginateId = req.query.index
  const postsLimit = 10
  const result = await postsService.getPostsByPreferences(
    userId,
    paginateId,
    postsLimit
  )
  res.status(200).json({ result })
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

const getUserPosts = asyncMiddleware(async (req, res) => {
  const { id } = req.query
  const posts = await postsService.getUserPosts(id)
  res.status(200).json({
    result: posts
  })
})

const searchPosts = function (req, res) {
  if (!req.query.tag) {
    return res.status(400).send('no tag specified!')
  }
  const tagName = req.query.tag

  let postsDocs = searchService.findByTag(tagName)
  postsDocs
    .then(snapshot => {
      if (snapshot.empty) {
        return res.send(400).send('No matching documents.')
      }
      posts = [];
      snapshot.forEach(doc => {
        posts.push(doc.data());
      });
      res.json({ posts })
    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.status(500).send(err)
    });
}

module.exports = {
  savePost,
  searchPosts,
  deletePost,
  editPost,
  uploadVideos,
  getPostsByViews,
  getPostsByFollowings,
  getPostsByTags,
  getPostsByPreferences,
  getUserPosts
}
