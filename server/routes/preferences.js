const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const { save } = require('../controllers/preferences')
const { get } = require('../controllers/preferences')

router.post('/save', protected, save)
router.get('/get', protected, get)

module.exports = router
