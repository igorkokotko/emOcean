const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const protected = require('../middleware/protectRoute')
const {
  search,
  getProfile,
  saveProfile,
  uploadImage,
  setPreferences,
  getFollowersById,
  getFollowingsById,
  profileAction
} = require('../controllers/profiles')

// edit profile
router.post('/save-profile', protected, saveProfile)
router.post('/upload-image', protected, upload.single('file'), uploadImage)

// get some profiles
router.get('/get-profile', getProfile)

// profile actions (Block, unblock, follow, unfollow)
router.get('/profile-action', protected, profileAction)

// preferences
router.post('/set-preferences', protected, setPreferences)

// FOLLOWERS
router.get('/get-followers/:id', protected, getFollowersById)

// FOLLOWING
router.get('/get-followings/:id', protected, getFollowingsById)

// Search logic
router.post('/search', search)

// TODO

// custom profile settings
// delete profile

module.exports = router

// examples of correct queries with axios
// GET api/profiles/get-profile?id=12345
// GET api/profiles/get-profile?nickname=johndoe

// POST api/profiles/upload-image?type=avatar  (with form data file, image format .png,.jpeg,.jpg)
// POST api/profiles/upload-image?type=background  (with form data file, image format .png,.jpeg,.jpg)

// GET api/profiles/profile-action?action=follow&id=12345
// GET api/profiles/profile-action?action=unfollow&id=12345
// GET api/profiles/profile-action?action=block&id=12345
// GET api/profiles/profile-action?action=unblock&id=12345
