const CustomError = require('../common/CustomError')
const createJwtToken = require('../common/createToken')
const asyncMiddleware = require('../middleware/asyncMiddleware')
const authService = require('../services/AuthService')
const {
  validateEmail,
  validateNickname,
  validatePassword
} = require('../validation/auth')

exports.register = asyncMiddleware(async (req, res, next) => {
  const { email, password, nickname } = req.body

  // Each validation field could return is empty error or invalid format error
  const validatedEmailError = validateEmail(email)
  if (validatedEmailError !== undefined) {
    // create custom error which would be handled by error handler
    return next(new CustomError(validatedEmailError))
  }
  const validatedPasswordError = validatePassword(password)
  if (validatedPasswordError !== undefined) {
    return next(new CustomError(validatedPasswordError))
  }
  const validatedNicknameError = validateNickname(nickname)
  if (validatedPasswordError !== undefined) {
    return next(new CustomError(validatedNicknameError))
  }
  // db logic
  const registeredUser = await authService.createUserWithEmailAndPassword(
    email,
    password,
    nickname
  )
  res.status(200).json({ registeredUser })
})

exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body
  const validatedEmailError = validateEmail(email)
  if (validatedEmailError !== undefined) {
    return next(new CustomError(validatedEmailError))
  }
  const validatedPasswordError = validatePassword(password)
  if (validatedPasswordError !== undefined) {
    return next(new CustomError(validatedPasswordError))
  }

  const token = createJwtToken(
    await authService.loginWithEmailAndPassword(email, password)
  )
  res.status(200).json({ token })
})

exports.passwordRecovery = asyncMiddleware(async (req, res, next) => {
  const { email } = req.body
  // Each validation field could return is empty error or invalid format error
  const validatedEmailError = validateEmail(email)
  if (validatedEmailError !== undefined) {
    // create custom error which would be handled by error handler
    return next(new CustomError(validatedEmailError))
  }
  message = await authService.passwordRecovery(email)
  res.status(200).json({ message })
})
