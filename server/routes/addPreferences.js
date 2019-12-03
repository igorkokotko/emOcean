const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const {db} = require("../config/databaseConfig");


let save = function (req, res) {
    db.collection('users').doc(req.user).update({preferences: req.body}, 
        function(error) {
            if (error) {
                console.log('ahtung!' + error);
                res.send(error)
            } else {
                console.log('data was succesfuly updated');
                res.send('succesfull')
            }
        });
    // res.send()
  };


router.post('/save', protected, save)

module.exports = router
