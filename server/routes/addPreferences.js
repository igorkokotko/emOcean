const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const {db} = require("../config/databaseConfig");


let save = function (req, res) {
    // console.log(req.body[1])
    // console.log(req.user)
    db.collection('users').doc(req.user).update({preferences: req.body})   
  };


router.post('/save', protected, save)

module.exports = router
