const express = require("express")
const router = express.Router()
const protected = require("../middleware/protectRoute")
const mediaValidation = require("../middleware/mediaValidation")
const upload = require('../config/multerConfig')
const {
  savePost,
  uploadVideos
} = require("../controllers/posts")

router.post("/save-post", savePost)

router.post("/upload-videos", protected, upload.array("file", 2), mediaValidation, uploadVideos)

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
