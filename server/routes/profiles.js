const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const protected = require('../middleware/protectRoute')
const {
  getMyProfile,
  getProfileById,
  getProfileByNickname,
  saveProfile,
  uploadAvatar,
  uploadBackground,
  setPreferences,
  getMyFollowers,
  getFollowersById,
  blockProfile,
  unblockProfile,
  getMyFollowings,
  getFollowingsById,
  followProfile,
  unfollowProfile
} = require('../controllers/profiles')

// edite profile
router.post('/save-profile', protected, saveProfile)
router.post('/upload-avatar', protected, upload.single('file'), uploadAvatar)
router.post('/upload-background', protected, upload.single('file'), uploadBackground)

// get some profiles
router.get('/get-my-profile', protected, getMyProfile)
router.get('/get-profile-id/:id', getProfileById)
router.get('/get-profile-nickname/:nickname', getProfileByNickname)

// preferences
router.post('/set-preferences', protected, setPreferences)

// FOLLOWERS
router.get('/get-my-followers', protected, getMyFollowers)
router.get('/get-followers/:id', protected, getFollowersById)

// black list
router.get('/block/:id', protected, blockProfile) // block in my profile, block in his profile
router.get('/unblock/:id', protected, unblockProfile) // block in my profile, block in his profile

// FOLLOWING
// follow getters
router.get('/get-my-followings', protected, getMyFollowings)
router.get('/get-followings/:id', protected, getFollowingsById)
// follow actions
router.get('/follow/:id', protected, followProfile)
router.get('/unfollow/:id', protected, unfollowProfile)

// TODO

// custom profile settings
// delete profile

module.exports = router
