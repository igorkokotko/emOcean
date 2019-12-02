const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const {db} = require("../config/databaseConfig");


const save = () => {
    console.log('slkd')
    db.collection('users').doc('DaZx0hMA6DUbZYWWJamasm3pXlN2').set({preferences: 'kuhkerqeru'})
    .catch(err => {
        console.log(err)

    })
    
}


// let save = function (req, res) {
//     console.log(req.body[1])
//     console.log(req.user)
    // db.collection('users').doc('DaZx0hMA6DUbZYWWJamasm3pXlN2').add({preferences: 'kuhk'})   
//   };





router.post('/save', protected, save)

module.exports = router
