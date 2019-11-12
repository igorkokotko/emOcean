const express = require("express");
const router = express.Router();
// middleware for future protected routes
const protected = require("../middleware/protectRoute");
const {
  register,
  login,
  sendPasswordResetCode,
  resetPassword,
  signInWithGoogle,
  changePassword
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/loginwithgoogle", signInWithGoogle);

router.post("/changepassword", protected, changePassword);

router.post("/sendpasswordresetcode", sendPasswordResetCode);
router.post("/resetpassword", resetPassword);
router.post("/changepassword", changePassword);

module.exports = router;
