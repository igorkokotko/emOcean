const state = {
  token: '',
  user: '',
  notifyRegistered: false,
  notifyReset: false
}
const mutations = {
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
}
const actions = {
}

export default {
  state,
  mutations,
  actions
}
