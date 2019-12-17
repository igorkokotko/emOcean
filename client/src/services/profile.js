import axios from 'axios'
const apiProfile = '/api/profiles'

export const updateProfile = (editedData) => axios.post(`${apiProfile}/save-profile`, editedData)

export const getProfile = (params) => axios.get(`${apiProfile}/get-profile`, { params })

export const uploadAvatar = (avatar, params) => axios.post(`${apiProfile}/upload-image`, avatar, { params })

export const uploadBackground = (background, params) => axios.post(`${apiProfile}/upload-image`, background, { params })

export const searchByNick = (data) => axios.post(`${apiProfile}/search-by-nick`, data)

export const profileAction = (data) => axios.get(`${apiProfile}/profile-action?action=${data.action}&id=${data.id}`)
