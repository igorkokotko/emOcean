const jwt = require('jsonwebtoken')

const CustomError = require('../common/CustomError')
const { db } = require('../config/databaseConfig')

const protected = (req, res, next) => {
  let token
  // check what is in req.header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from header
    token = req.headers.authorization.split(' ')[1]
  }

  // Make sure token exists
  if (!token) {
    return next(
      new CustomError({
        name: 'AuthozationError',
        message: "You don't have token to be able to pass this route",
        status: 400
      })
    )
  }
  // Verify
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    next()
    // TODO  - at this moment we could fetch some user or profile data
    // db.collection('profiles')
    //   .doc('profile-' + decoded.id)
    //   .get()
    //   .then(profile => {
    //     req.profileData = profile.data()
    //     next()
    //   })
  } catch (err) {
    res.send({ err })
  }
}

module.exports = protected
