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


const searchPosts = function(req, res) {
  if (!req.query.tag) {
    res.status(400).send('no tag specified!')
    return
  }
  const value  = req.query.tag

  let postsDocsPromise = searchService.findByTag(value)
  postsDocsPromise.then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;

    } else {
      posts = [];
      snapshot.forEach(doc => {
        posts.push(doc.data());
      });
      res.json({posts})
    }     
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}

module.exports = {
  savePost,
  uploadVideo,
  searchPosts
}
