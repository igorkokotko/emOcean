const { db } = require("../config/databaseConfig");

const findByNickname = (nickname) => {
  return new Promise((resolve, reject) => {
    const userRef = db.collection("users");
    userRef
      .where("keywords", "array-contains", nickname.toLowerCase())
      .get()
      .then(( snapshot ) => {
        if (snapshot.empty) {
          reject()
        } else {
          const users = [];
          snapshot.forEach(doc => {
            users.push(doc.data())
          })
        resolve(users)
        }
      })
      .catch(err => reject(err))
  })
};

module.exports = {
  findByNickname
};
