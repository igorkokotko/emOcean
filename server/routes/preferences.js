const express = require('express')
const router = express.Router()
const protected = require('../middleware/protectRoute')
const { save } = require('../controllers/preferences')
// const {db} = require("../config/databaseConfig");


// let save = function (req, res) {
//   try {
//     db.collection('users').doc(req.userId).update({preferences: req.body})    
//       .then(resolve => {
//         res.send('Code Updated')
//       })
//       .catch(error => {
//         res.status(408).send('Error - ' + error)
//       })
//   } catch (error) {
//     res.status(505).send('Error - ' + error)
//   }
// };

router.post('/save', protected, save)

module.exports = router
