import { checkToken } from '@/services/auth.js'

export const isAuthorized = function () {
  return new Promise((resolve, reject) => {
    checkToken()
      .then((res) => {
        if (res.data.id === window.localStorage.getItem('profileId')) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((err) => reject(err.response.data))
  })
}
