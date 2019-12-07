const CustomError = require('../common/CustomError')
const asyncMiddleware = require('../middleware/asyncMiddleware')
const postsService = require('../services/PostsService')
const { validateVideo } = require('../validation/posts')
const searchService = require("../services/SearchService")

const uploadVideo = asyncMiddleware(async (req, res, next) => {
  const uploadedVideo = req.file

  // second arg means max image size in mb
  const validatedVideoError = validateVideo(uploadedVideo, 20)
  if (validatedVideoError !== undefined) {
    return next(new CustomError(validatedVideoError))
  }
  const postVideoUrl = await postsService.uploadVideo(
    uploadedVideo,
    req.userId,
    'videos'
  )

  res.status(200).json({ postVideoUrl })
})

const savePost = asyncMiddleware(async (req, res, next) => {
  // TODO
  res.status(200).json({ success: true })
})


const searchPost = function(req, res) {
  const value  = req.body
  let message = searchService.findByTag(value)
  res.send(message)
}

module.exports = {
  savePost,
  uploadVideo,
  searchPost
}
