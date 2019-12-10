const CustomError = require('../common/CustomError')
const asyncMiddleware = require('../middleware/asyncMiddleware')
const postsService = require('../services/PostsService')
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

module.exports = {
    savePost,
    uploadVideo
}