const validateVideo = (video, acceptedVideoSize) => {
  const availableFormats = [
    'video/mpeg',
    'video/ogg',
    'video/mp4',
    'video/webm'
  ]
  if (!availableFormats.includes(video.mimetype)) {
    return {
      name: 'ClientError',
      message:
        'Incorrect video format. You need to upload video with .mpeg/.ogg/.mp4/.webm',
      status: 400
    }
  }
  if (video.size > acceptedVideoSize * 1000000) {
    return {
      name: 'ClientError',
      message: `Video too large. Size limit is ${acceptedVideoSize}mb`,
      status: 400
    }
  }
}

module.exports = {
  validateVideo
}
