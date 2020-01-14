import axios from 'axios'
const apiRoute = '/api/posts'

export const uploadMedia = (media, type) => {
  return axios.post(`${apiRoute}/upload-videos?type=${type}`, media, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const savePost = postData =>
  axios.post(`${apiRoute}/save-post`, postData)

export const editPost = (postData, postId) =>
  axios.put(`${apiRoute}/edit-post/${postId}`, postData)

export const deletePost = postId =>
  axios.delete(`${apiRoute}/delete-post/${postId}`)

export const getPostsByType = (payload) => {
  let route = `${apiRoute}/get-posts?type=${payload.type}`
  if (payload.type === 'search') {
    if (payload.tags) {
      route = `${route}&tags=${payload.tags}`
    } else {
      route = `${route}&emoji=${payload.emoji}`
    }
  }
  if (payload.index && payload.index !== 'Last index') {
    return axios.get(route, {
      params: {
        index: payload.index
      }
    })
  }
  return axios.get(route)
}

export const getLikedList = (videoId) => {
  axios.get(`/api/posts/get-post-likes/${videoId}`)
    .then((response) => {
      return response.data.result
    })
    .catch(error => {
      return error.statusText
    })
}

export const updateLikes = postId => {
  return axios.get(`/api/posts/like-post/${postId}`)
}

export const incrementViewsCounter = postId => {
  return axios.get(`/api/posts/increment-views-counter/${postId}`)
}

export const getUserLikedPostsById = id => {
  return axios.get(`/api/posts/get-user-liked-posts?id=${id}`)
}

export const getUserPostsById = id => {
  return axios.get(`/api/posts/get-user-posts?id=${id}`)
}
