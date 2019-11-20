const jwt = require("jsonwebtoken")
const CustomError = require("../common/CustomError")
const createJwtToken = require("../common/createToken")
const asyncMiddleware = require("../middleware/asyncMiddleware")
const authService = require("../services/AuthService")
const {
  validateEmail,
  validateNickname,
  validatePassword
} = require("../validation/auth")

const register = asyncMiddleware(async (req, res, next) => {
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
  const message = await authService.createUserWithEmailAndPassword(
    email,
    password,
    nickname
  )

  res.status(200).json({ message })
});

const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body
  const validatedEmailError = validateEmail(email)
  if (validatedEmailError !== undefined) {
    return next(new CustomError(validatedEmailError))
  }
  const validatedPasswordError = validatePassword(password)
  if (validatedPasswordError !== undefined) {
    return next(new CustomError(validatedPasswordError))
  }
  const currentUser = await authService.loginWithEmailAndPassword(
    email,
    password
  )

  const token = createJwtToken(currentUser)

  res.status(200).json({ token })
})

const changePassword = asyncMiddleware(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body
  const token = req.headers.authorization.split(" ")[1]
  console.log(jwt.verify(token, process.env.JWT_SECRET).value)
  const { email } = jwt.verify(token, process.env.JWT_SECRET).value
  const validatedPasswordError = validatePassword(newPassword)
  if (validatedPasswordError !== undefined) {
    return next(new CustomError(validatedPasswordError))
  }

  const message = await authService.changePassword(
    oldPassword,
    newPassword,
    email
  )
  res.status(200).json({ message })
})

const sendPasswordResetCode = asyncMiddleware(async (req, res, next) => {
  const { email } = req.body

  // Each validation field could return is empty error or invalid format error
  const validatedEmailError = validateEmail(email)
  if (validatedEmailError !== undefined) {
    // create custom error which would be handled by error handler
    return next(new CustomError(validatedEmailError))
  }
  const message = await authService.sendPasswordResetCode(email)
  res.status(200).json({ message })
})

const resetPassword = asyncMiddleware(async (req, res, next) => {
  const { oobCode, password } = req.body
  // Each  field could return is empty error or invalid format error
  const validatedPasswordError = validatePassword(password)
  if (validatedPasswordError !== undefined) {
    return next(new CustomError(validatedPasswordError))
  }
  message = await authService.resetPassword(oobCode, password);
  res.status(200).json({ message })
})

const signInWithGoogle = asyncMiddleware(async (req, res) => {
  const { id_token } = req.body

  const user = await authService.signInWithGoogle(id_token)

  const token = createJwtToken(user)
  res.status(200).json({ token })
})

module.exports = {
  register,
  login,
  sendPasswordResetCode,
  changePassword,
  resetPassword,
  signInWithGoogle
}
