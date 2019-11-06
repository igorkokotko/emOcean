// TODO Check which errors can be thrown from db or other directions and create
// with the custom error class
const CustomError = require('../common/CustomError')

const errorHandler = (err, req, res, next) => {
  const error = { ...err }
  error.message = err.message
  res
    .status(error.status || 500)
    .json({ error: error.message || 'Unknown Error' })
}

module.exports = errorHandler
