// TODO Check which errors can be thrown from db or other directions and create
// own message
const CustomError = require("../common/CustomError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  res.status(400).json({ error: error.message });
};

module.exports = errorHandler;
