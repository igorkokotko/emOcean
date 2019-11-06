const express = require('express')
const router = express.Router()
// middleware for future auth routes
const protected = require('../middleware/protectRoute')
const { register, login, passwordRecovery } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)

router.post('/passwordrecovery', passwordRecovery)

module.exports = router
