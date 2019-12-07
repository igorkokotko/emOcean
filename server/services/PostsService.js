const { db, storage } = require('../config/databaseConfig')

const uploadVideo = function(video, userId, dest) {
  const metaData = {
    contentType: video.mimetype
  }
  const videoRef = storage.ref().child(`${dest}/${userId}/${Date.now()}`)
  return videoRef.put(video.buffer, metaData).then(() => {
    return videoRef.getDownloadURL()
  })
}

module.exports = {
  uploadVideo
}
