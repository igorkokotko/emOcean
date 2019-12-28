const CustomError = require('../common/CustomError')
const asyncMiddleware = require('../middleware/asyncMiddleware')
const postsService = require('../services/PostsService')
const VideoHandler = require('../videoHandling/videoHandler')
const clearTempFiles = require('../common/clearTempFiles')
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


const searchPosts = function(req, res) {
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
    res.json({posts})
  })
  .catch(err => {
    console.log('Error getting documents', err);
    res.status(500).send(err)
  });
}
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
  uploadVideos,
  searchPosts,
  updateLikes,
  incrementViewsCounter,
  getPostLikes,
  getUserLikedPosts,
  getPostsByEmoji
}
