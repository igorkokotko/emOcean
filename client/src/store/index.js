import Vue from 'vue'
import Vuex from 'vuex'
import profile from './modules/profile'

Vue.use(Vuex)

const authentication = {
  state: {
    token: '',
    user: '',
    notifyRegistered: false,
    notifyReset: false
  },
  mutations: {
    login (state, payload) {
      state.token = payload.token
      state.user = payload.user
    },
    notifyRegistered (state, n) {
      state.notifyRegistered = n
    },
    notifyReset (state, n) {
      state.notifyReset = n
    }
  },
  actions: {
  }
}

export default new Vuex.Store({
  modules: {
    auth: authentication,
    profile
  }
})
