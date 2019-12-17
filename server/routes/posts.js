const express = require("express")
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const protected = require('../middleware/protectRoute')
const { savePost, uploadVideo } = require('../controllers/posts')
const { search } = require('../controllers/posts')

router.post('/save-post', protected, savePost)
// router.post('/upload-video', protected, upload.single('file'), uploadVideo)
router.get('/search', search)

// router.post("/upload-videos", protected, upload.array("file", 2), mediaValidation, uploadVideos)

// /api/posts/upload-videos?type=single-video
// /api/posts/upload-videos?type=two-videos
// /api/posts/upload-videos?type=video-and-audio

// get popular posts (by likes) with pagination
// get recommended posts from feed with pagination
// get posts from my followers feed with pagination
// edit my post
// get post by id
// get posts by userId
// like/unlike  post


module.exports = router;
