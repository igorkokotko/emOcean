const Authorized = require('./Authorized.js')

export const authModalMixin = {
  data () {
    return {
      scrollInfo: {},
      showLoginPage: false
    }
  },
  methods: {
    onScroll (info) {
      if (info.position > 1000 && !Authorized.isAuthorized) {
        this.showLoginPage = true
      }
    }
  }
}
