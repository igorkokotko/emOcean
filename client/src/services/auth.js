import axios from 'axios'

export default {
  changePassword (data) {
    return axios.post('/api/auth/change-password', data)
  }
}
