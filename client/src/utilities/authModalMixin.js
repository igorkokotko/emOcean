import { isAuthorized } from '../views/Authentication/Authorized'

export const authModalMixin = {
  data () {
    return {
      scrollInfo: {},
      showLoginPage: false
    }
  },
  methods: {
    onScroll (info) {
      if (!isAuthorized() && info.position > 5000) {
        this.showLoginPage = true
      }
    }
  }
}
