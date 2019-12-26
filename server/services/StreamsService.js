const { db } = require('../config/databaseConfig')
const CustomError = require('../common/CustomError')
const firebase = require('firebase')

const createStream = (streamData) => {
  return db.collection("streams").add({
    title: streamData.title,
    author: db.doc('/users/' + streamData.author),
    startTime: firebase.firestore.Timestamp.fromDate(streamData.startTime)
  })
}

const getStreamList = () => {
  return db.collection('streams')
    .get()
}

const getStreamById = (streamId) => {
  const streamRef = db.collection('streams').doc(streamId)

  return new Promise ((resolve, reject) => {
    streamRef.get()
      .then(doc => {
        if (!doc.exists) {
          reject(new CustomError({
            name: 'DatabaseError',
            message: 'No stream with given id',
            status: 404
          }))
        }
        resolve(doc.data())
      })
      .catch(err => reject(err))
    })
}


module.exports = {
  createStream,
  getStreamList,
  getStreamById
}