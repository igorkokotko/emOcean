const express = require('express')
const router = express.Router()
const { getFeedAnonimus } = require('../controllers/feed')
const { getFeedByPreferences } = require('../controllers/feed')
const protected = require('../middleware/protectRoute')

router.get('/anonimus', getFeedAnonimus)
router.get('/authorized', protected, getFeedByPreferences)

module.exports = router