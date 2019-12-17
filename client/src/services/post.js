import axios from 'axios'
const apiPosts = '/api/posts'

export const searchByTag = (data) => axios.get(`${apiPosts}/search?tag=${data}`)
