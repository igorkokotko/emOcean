const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const mediaValidation = require('../middleware/mediaValidation')
const upload = require('../config/multerConfig')
const {
  savePost,
  uploadVideos,
  getPostsByViews,
  getPostsByFollowings,
  getPostsByPreferences,
  getPostsByTags,
  editPost,
  deletePost,
  getUserPosts,
  searchPosts
} = require('../controllers/posts')

router.post(
  '/upload-videos',
  protected,
  upload.array('file', 2),
  mediaValidation,
  uploadVideos
)
router.post('/save-post', protected, savePost)
router.delete('/delete-post/:postId', protected, deletePost)
router.put('/edit-post/:postId', protected, editPost)

router.get('/by-tags', getPostsByTags)
router.get('/by-views', getPostsByViews)
router.get('/by-followings', protected, getPostsByFollowings)
router.get('/by-preferences', protected, getPostsByPreferences)
router.get('/get-user-posts', getUserPosts)

router.get('/search', searchPosts)

module.exports = router;
