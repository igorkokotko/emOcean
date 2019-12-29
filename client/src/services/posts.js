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

export const getPostsByViews = index => {
  const route = index ? `${apiRoute}/by-views?index=${index}` : `${apiRoute}/by-views`
  return axios.get(route)
}

export const getPostsByTag = (tag, index) => {
  const route = index ? `${apiRoute}/by-tags?tag=${tag}&index=${index}` : `${apiRoute}/by-tags?tag=${tag}`
  return axios.get(route)
}

export const getPostsByFollowings = index => {
  const route = index ? `${apiRoute}/by-followings?index=${index}` : `${apiRoute}/by-followings`
  return axios.get(route)
}

export const getPostsByPreferences = index => {
  const route = index ? `${apiRoute}/by-preferences?index=${index}` : `${apiRoute}/by-preferences`
  return axios.get(route)
}
// My
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

export const getPostsByEmoji = (emoji, index) => {
  const route = index ? `${apiRoute}/get-post-emoji?emoji=${emoji}&index=${index}` : `${apiRoute}/get-post-emoji?emoji=${emoji}`
  return axios.get(route)
}
