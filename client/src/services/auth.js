import axios from 'axios'

export default {
  changePassword (data) {
    return axios.post('/api/auth/change-password', data)
  },

  updateProfile (editedData) {
    return axios.post('/api/profiles/save-profile', editedData)
  },

  getProfile (params) {
    return axios.get('/api/profiles/get-profile', { params })
  },

  uploadAvatar (avatar, params) {
    return axios.post('/api/profiles/upload-image', avatar, { params })
  },

  uploadBackground (background, params) {
    return axios.post('/api/profiles/upload-image', background, { params })
  }
}
