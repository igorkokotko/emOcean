const { db, storage } = require("../config/databaseConfig")

const uploadVideo = function (video, userId, dest) {
  return new Promise(function (resolve, reject) {
    const metaData = {
      contentType: video.mimetype
    }
    const videoRef = storage.ref().child(`${dest}/${userId}/${Date.now()}`)
    videoRef.put(video.buffer, metaData).then(res => {
      videoRef.getDownloadURL().then(res => resolve(res))
        .catch(err => reject(err))
    })
      .catch(err => reject(err))
  })
}

module.exports = {
  uploadVideo
}
