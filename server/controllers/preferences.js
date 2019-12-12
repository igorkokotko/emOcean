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

  let get = function (req, res) {
    try {
      let userDoc = db.collection('users').doc(req.userId)
      // console.log(userDoc)
      userDoc
        .get()
        .then(doc => {
          let pref = doc.data().preferences
          console.log(pref)
          res.json(pref)
        })
        .catch(error => {
          res.status(400).send('Error - ' + error)
        })
    } catch (error) {
      res.status(500).send('Error - ' + error)
    }
  }

module.exports = {
    save,
    get
}
