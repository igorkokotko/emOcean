const express = require('express')
const router = express.Router()
const { getFeed } = require('../controllers/feed')

router.get('/', getFeed)

module.exports = router