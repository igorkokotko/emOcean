const express = require("express");
const router = express.Router();
const { test, register } = require("../controllers/auth");

router.get("/test", test);
router.post("/register", register);
// router.post("/login", login);

module.exports = router;
