const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const mediaValidation = require('../middleware/mediaValidation')
const upload = require('../config/multerConfig')
const {
  savePost,
  uploadVideos,
  searchPosts,
  getUserLikedPosts,
  updateLikes,
  incrementViewsCounter,
  getPostLikes,
  getPostsByEmoji,
  editPost,
  deletePost,
  getUserPosts,
  getPostsByType
} = require('../controllers/posts')

router.post(
  '/upload-videos',
  protected,
  upload.array('file', 2),
  mediaValidation,
  uploadVideos
)
router.post('/save-post', protected, savePost)
router.get('/search', searchPosts)

router.post("/upload-videos", protected, upload.array("file", 2), mediaValidation, uploadVideos)

router.get('/get-user-liked-posts', getUserLikedPosts)
router.get('/like-post/:postId', protectedMiddleware, updateLikes)
router.get('/increment-views-counter/:postId', incrementViewsCounter)
router.get('/get-post-likes/:postId', getPostLikes)
router.get('/get-post-emoji', getPostsByEmoji)
router.delete('/delete-post/:postId', protected, deletePost)
router.put('/edit-post/:postId', protected, editPost)

router.get('/get-user-posts', getUserPosts)
router.get('/get-posts', getPostsByType)

module.exports = router;
