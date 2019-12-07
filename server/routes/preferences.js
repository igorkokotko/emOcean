const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const { save } = require('../controllers/preferences')

router.post('/save', protected, save)

module.exports = router
