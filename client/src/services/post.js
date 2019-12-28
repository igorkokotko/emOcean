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

export const getPostsByType = (params) => {
  let route
  switch (params.type) {
    case 'followings':
      route = `${apiRoute}/by-followings`
      break
    case 'popular':
      route = `${apiRoute}/by-views`
      break
    case 'preferences':
      route = `${apiRoute}/by-preferences`
      break
    case 'search':
      route = `${apiRoute}/by-tags?tags=${params.tags}`
      break
  }
  if (params.index && params.index !== 'Last index') {
    return axios.get(route, { params: { index: params.index } })
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

