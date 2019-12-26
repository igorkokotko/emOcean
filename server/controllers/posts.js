const CustomError = require('../common/CustomError')
const asyncMiddleware = require('../middleware/asyncMiddleware')
const postsService = require('../services/PostsService')
const VideoHandler = require('../videoHandling/videoHandler')
const clearTempFiles = require('../common/clearTempFiles')
const searchService = require("../services/SearchService")
const { db } = require("../config/databaseConfig");


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
const { validateVideo } = require('../validation/posts')
const { db } = require("../config/databaseConfig");
const uploadVideo = asyncMiddleware(async(req, res, next) => {
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

const savePost = asyncMiddleware(async(req, res, next) => {
    try {
        db.collection("posts").add(req.body)
            .then(resolve => {
                db.collection("users").doc(req.userId).update({ posts: req.body })
                res.send()
            })
            .catch(error => {
                res.status(400).send('Error - ' + error)
            })
    } catch (error) {
        res.status(500).send('Error - ' + error)
    }
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
            res.json({ posts })
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(500).send(err)
        });
}

module.exports = {

  savePost,
  uploadVideos,
  searchPosts
}

