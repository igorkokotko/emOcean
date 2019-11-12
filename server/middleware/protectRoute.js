const jwt = require("jsonwebtoken");

const CustomError = require("../common/CustomError");
const { db } = require("../config/databaseConfig");

const protected = (req, res, next) => {
  let token;
  // check what is in req.header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from header
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return next(
      new CustomError({
        name: "AuthozationError",
        message: "You don't have token to be able to pass this route",
        status: 400
      })
    );
  }
  // Verify
  try {
    // Verify token
    // Option 1
    const decoded = jwt.verify(token, process.env.JWT_SECRET).value;
    req.user = decoded.uid;
    next();
    // Option 2, to get whole user profile from token, but i prefer
    // to send only token and then if need some data on a page, to do logic as above
    //
    // const profileRef = db.collection("profiles").doc(decoded.id);
    // req.user = profileRef
    //   .get()
    //   .then(doc => {
    //     if (!doc.exists) {
    //       return next(
    //         new CustomError({
    //           name: "Database error",
    //           message: "No such profile",
    //           status: 404
    //         })
    //       );
    //     } else {
    //       req.userData = doc.data();
    //       next();
    //     }
    //   })
    //   .catch(err => {
    //     return next(
    //       new CustomError({
    //         name: "Database error",
    //         message: "Something went wrong",
    //         status: 500
    //       })
    //     );
    //   });
  } catch (err) {
    return next(
      new CustomError({
        name: "AuthozationError",
        message: "You don't have token to be able to pass this route",
        status: 400
      })
    );
  }
};

module.exports = protected;
