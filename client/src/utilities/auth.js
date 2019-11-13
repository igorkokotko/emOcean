const validator = require('validator')

// Currently validation rules isn't very sctrict, but in development process we would make him more advanced
const validateEmail = email => {
  if (validator.isEmpty(email)) {
    return {
      message: 'empty email'
    }
  }
  if (!validator.isEmail(email)) {
    return {
      message: 'invalid email'
    }
  }
}

const validatePassword = password => {
  if (validator.isEmpty(password)) {
    return {
      message: 'empty password'
    }
  }
  if (
    !validator.isLength(password, { min: 8, max: 20 })
  ) {
    return {
      message:
        'wrong length'
    }
  }
  if (
    // regexp for whitespace check
    /\s/.test(password) ||
    // two validation below to be sure that password wouldnt have only lowercase or uppercase
    validator.isUppercase(password) ||
    validator.isLowercase(password)
  ) {
    return {
      message: 'wrong content'
    }
  }
}

const validateNickname = nickname => {
  if (validator.isEmpty(nickname)) {
    return {
      message: 'empty nickname'
    }
  }
  if (
    !validator.isLength(nickname, { min: 4, max: 20 })
  ) {
    return {
      message:
        'wrong length'
    }
  }
  if (
    /\s/.test(nickname)
  ) {
    return {
      message: 'space'
    }
  }
}

module.exports = {
  validateEmail,
  validateNickname,
  validatePassword
}
