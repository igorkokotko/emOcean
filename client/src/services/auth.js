import axios from 'axios'

export default {
  changePassword (data) {
    return axios.post('/api/auth/change-password', data)
  },

  updateProfile (editedData) {
    return axios.post('/api/profiles/save-profile', editedData)
  },

  getProfile () {
    return axios.get('/api/profiles/get-profile')
  },

  uploadAvatar (avatar) {
    return axios.post('/api/profiles/upload-image', avatar)
  },

  uploadBackground (background) {
    return axios.post('/api/profiles/upload-image', background)
  }
}
