const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const {db} = require("../config/databaseConfig");


let save = function (req, res) {
  try {
    db.collection('users').doc(req.user).update({preferences: req.body})    
      .then(resolve => {
        res.send('Code Updated')
      })
      .catch(error => {
        res.send('Error - ' + error)
      })
  } catch (error) {
    res.send('Error - ' + error)
  }
};

router.post('/save', protected, save)

module.exports = router
