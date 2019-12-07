export const authModalMixin = {
  data () {
    return {
      scrollInfo: {},
      showLoginPage: false
    }
  },
  methods: {
    onScroll (info) {
      if (info.position > 1000) {
        this.showLoginPage = true
      }
    }
  }
}
