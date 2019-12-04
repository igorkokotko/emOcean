const axios = require('axios')
const apiAuth = '/api/auth'

module.exports = {
  login (data) {
    return axios.post(`${apiAuth}/login`, data)
  },
  register (data) {
    return axios.post(`${apiAuth}/register`, data)
  },
  googleSignIn (data) {
    return axios.post(`${apiAuth}/login-with-google`, data)
  },
  forgot (data) {
    return axios.post(`${apiAuth}/send-password-reset-code`, data)
  },
  resetPass (data) {
    return axios.post(`${apiAuth}/reset-password`, data)
  }
}
