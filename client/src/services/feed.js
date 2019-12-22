import axios from 'axios'
const apiPosts = '/api/feed'

export const getFeedAnonimus = () => axios.get(`${apiPosts}/anonimus`)
export const getFeedByPreferences = () => axios.get(`${apiPosts}/authorized`)
