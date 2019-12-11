const { isAuthorized } = require('./Authorized.js')

export const authModalMixin = {
  data () {
    return {
      scrollInfo: {},
      showLoginPage: false
    }
  },
  methods: {
    onScroll (info) {
      if (info.position > 1000 && !isAuthorized()) {
        this.showLoginPage = true
      }
    }
  }
}
