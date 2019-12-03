const validateVideo = (video, acceptedVideoSize) => {
  if (
    !(
      video.mimetype === 'video/mpeg' ||
      video.mimetype === 'video/ogg' ||
      video.mimetype === 'video/mp4' ||
      video.mimetype === 'video/webm'
    )
  ) {
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
