const CustomError = require('../common/CustomError')
const asyncMiddleware = require('../middleware/asyncMiddleware')
const postsService = require('../services/PostsService')
const VideoHandler = require('../videoHandling/videoHandler')
const clearTempFiles = require('../common/clearTempFiles')
const { validateVideo } = require('../validation/posts')
const searchService = require("../services/SearchService")


const uploadVideos = asyncMiddleware(async (req, res, next) => {
  const { type } = req.query
  const media = req.files
  const id = req.userId
  const videoHandler = new VideoHandler(media, type, id)
  videoHandler.apply().then(videoUrl => {
    res.status(200).json({ videoUrl })
  }).finally(() => {
    clearTempFiles('uploads', id)
  })
}
)


const savePost = asyncMiddleware(async (req, res, next) => {
  // TODO
  res.status(200).json({ success: true })
})



const search = asyncMiddleware(async (req, res, next) => {
  const tag = req.query.tag
  const message = await searchService.searchByTag(tag)
  res.status(200).json({ message })
})
  
  module.exports = {
    search,
    savePost,
    // uploadVideo
  }
  
