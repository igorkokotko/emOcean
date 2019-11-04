const firebase = require("./db");

exports.createUserWithEmailAndPassword = function(email, password) {
  return new Promise(function(resolve, reject) {
    resolve(firebase.auth().createUserWithEmailAndPassword(email, password));
  });
};
