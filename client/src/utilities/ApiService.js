var axios = require('axios')

module.exports = {
  setApiAuthorizationHeaders (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
}
