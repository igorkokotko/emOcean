const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const {
  register,
  login,
  checkToken,
  sendPasswordResetCode,
  resetPassword,
  signInWithGoogle,
  changePassword,
  deleteAccount
} = require('../controllers/auth')

router.get('/check-token', protected, checkToken)

router.post('/register', register)
router.post('/login', login)
router.post('/login-with-google', signInWithGoogle)

router.post('/change-password', protected, changePassword)

router.post('/send-password-reset-code', sendPasswordResetCode)
router.post('/reset-password', resetPassword)
router.post('/change-password', changePassword)

router.delete('/delete-account', protected, deleteAccount)

module.exports = router
