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
  return new Promise((resolve, reject) => {
    let postsRef = db.collection('posts');
  postsRef
    .where('tag', 'array-contains', tag)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        reject(
          new CustomError({
            name: "DatabaseError",
            message: "No post has been found",
            status: 404
          })
        )
      }
      console.log('serarchbeytag')
      const posts = {}
      snapshot.forEach(doc => {
        posts[doc.id] = doc.data();
      });
      resolve(posts)
    })
    .catch(err => { reject(err) });
  })
}

module.exports = {
  searchByNick,
  searchByTag
};
