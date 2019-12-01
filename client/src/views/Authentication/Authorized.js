module.exports = {
  isAuthorized () {
    if (window.localStorage.getItem('token') && window.localStorage.getItem('token') !== '') {
      return true
    } else {
      return false
    }
  }
}
