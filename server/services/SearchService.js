const { db } = require("../config/databaseConfig");
const CustomError = require("../common/CustomError");

const searchByNick = (nickname) => {
  return new Promise((resolve, reject) => {
    const userRef = db.collection("users");
    userRef
      .where("keywords", "array-contains", nickname.toLowerCase())
      .get()
      .then(( snapshot ) => {
        if (snapshot.empty) {
          reject(
            new CustomError({
              name: "DatabaseError",
              message: "No user has been found",
              status: 404
            })
          )
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

const searchByTag = (tag) => {
  let postsRef = db.collection('posts');
  let query = postsRef.where('tag', '==', tag).get()

  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }    
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  return query
}

// findByTag('#nature')

module.exports = {
  searchByNick,
  searchByTag
};
