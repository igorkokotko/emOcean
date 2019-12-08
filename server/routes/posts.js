const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const protected = require('../middleware/protectRoute')
const { savePost, uploadVideo } = require('../controllers/posts')
const { searchPosts } = require('../controllers/posts')

router.post('/save-post', protected, savePost)
router.post('/upload-video', protected, upload.single('file'), uploadVideo)
router.get('/search', searchPosts)

// TODO

// get popular posts (by likes) with pagination
// get recommended posts from feed with pagination
// get posts from my followers feed with pagination
// show popular posts with pagination
// edit my post
// delete my posts
// get post by id
// get posts by userId
// like/unlike  post 
// like/unlike  post

module.exports = router
