const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const {
  register,
  login,
  sendPasswordResetCode,
  resetPassword,
  signInWithGoogle,
  changePassword
} = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/login-with-google', signInWithGoogle)

router.post('/change-password', protected, changePassword)

router.post('/send-password-reset-code', sendPasswordResetCode)
router.post('/reset-password', resetPassword)
router.post('/change-password', changePassword)

module.exports = router
