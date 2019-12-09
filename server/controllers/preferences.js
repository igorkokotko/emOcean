const {db} = require("../config/databaseConfig");


let save = function (req, res) {
    try {
      db.collection('users').doc(req.userId).update({preferences: req.body})    
        .then(resolve => {
          res.send('Code Updated')
        })
        .catch(error => {
          res.status(400).send('Error - ' + error)
        })
    } catch (error) {
      res.status(500).send('Error - ' + error)
    }
  };

module.exports = {
    save
}