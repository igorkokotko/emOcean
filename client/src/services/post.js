import axios from 'axios'

export default {
  getLikedList: (videoId) => {
    axios.get(`/api/posts/get-post-likes/${videoId}`)
      .then((response) => {
        return response.data.result
      })
      .catch(error => {
        return error.statusText
      })
  }
}
