const CustomError = require("../common/CustomError")
const asyncMiddleware = require("../middleware/asyncMiddleware")
const profilesService = require("../services/ProfilesService")
const {
  validateImage,
} = require("../validation/profiles")

// req.userId - from protected route handler
const getMyProfile = asyncMiddleware(async (req, res) => {
  const myProfile = await profilesService.getProfileById(req.userId)

  res.status(200).json({ myProfile })
})

const getProfileById = asyncMiddleware(async (req, res) => {
  const { id } = req.params

  const profile = await profilesService.getProfileById(id)

  res.status(200).json({ profile })
})

const getProfileByNickname = asyncMiddleware(async (req, res) => {
  const { nickname } = req.params

  const profile = await profilesService.getProfileByNickname(nickname)

  res.status(200).json({ profile })
})

const uploadAvatar = asyncMiddleware(async (req, res, next) => {
  const avatarImage = req.file
  // second param means max image size in mb 
  const validatedAvatarError = validateImage(avatarImage, 5)
  if (validatedAvatarError !== undefined) {
    return next(new CustomError(validatedAvatarError))
  }

  const avatarImageUrl = await profilesService.uploadPhoto(avatarImage, req.userId, 'avatars')

  res.status(200).json({ avatarImageUrl })
})

const uploadBackground = asyncMiddleware(async (req, res, next) => {
  const backgroundImage = req.file

  const validatedBackgroundError = validateImage(backgroundImage, 5)
  if (validatedBackgroundError !== undefined) {
    return next(new CustomError(validatedBackgroundError))
  }

  const backgroundImageUrl = await profilesService.uploadPhoto(backgroundImage, req.userId, 'backgrounds')

  res.status(200).json({ backgroundImageUrl })
})

const saveProfile = asyncMiddleware(async (req, res) => {
  const userData = req.body
  // TODO VALIDATION USERNAME, BIO, SOCIALS, INTERESTS, STATUS, BG AND URLS
  const message = await profilesService.saveProfile(userData, req.userId)

  res.status(200).json({ message })
})

const setPreferences = asyncMiddleware(async (req, res) => {
  const { preferences } = req.body

  const message = await profilesService.setPreferences(preferences, req.userId)

  res.status(200).json({ message })
})
const getMyFollowers = asyncMiddleware(async (req, res) => {
  const myId = req.userId

  const followers = await profilesService.getFollowersById(myId)

  res.status(200).json({ followers })
})
const getFollowersById = asyncMiddleware(async (req, res) => {
  const profileId = req.params.id

  const followers = await profilesService.getFollowersById(profileId)

  res.status(200).json({ followers })
})
const blockProfile = asyncMiddleware(async (req, res) => {
  const blockedUserId = req.params.id

  const message = await profilesService.blockProfile(req.userId, blockedUserId)

  res.status(200).json({ message })
})

const unblockProfile = asyncMiddleware(async (req, res) => {
  const unblockedUserId = req.params.id

  const message = await profilesService.unblockProfile(req.userId, unblockedUserId)

  res.status(200).json({ message })
})

const getMyFollowings = asyncMiddleware(async (req, res) => {
  const myId = req.userId

  const followings = await profilesService.getFollowingsById(myId)

  res.status(200).json({ followings })
})
const getFollowingsById = asyncMiddleware(async (req, res) => {
  const profileId = req.params.id

  const followings = await profilesService.getFollowingsById(profileId)

  res.status(200).json({ followings })
})
const followProfile = asyncMiddleware(async (req, res) => {
  const myId = req.userId
  const followId = req.params.id

  const followProfile = await profilesService.followProfile(myId, followId)

  res.status(200).json({ followProfile })
})
const unfollowProfile = asyncMiddleware(async (req, res) => {
  const myId = req.userId
  const followId = req.params.id

  const followProfile = await profilesService.unfollowProfile(myId, followId)

  res.status(200).json({ followProfile })
})

module.exports = {
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
}