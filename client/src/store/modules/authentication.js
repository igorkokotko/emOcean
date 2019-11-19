const state = {
  token: '',
  user: '',
  notifyRegistered: false,
  notifyReset: false
}
const getters = {
  notifyRegistered: state => {
    return state.notifyRegistered
  },
  notifyReset: state => {
    return state.notifyReset
  }
}
const mutations = {
  login (state, payload) {
    state.token = payload.token
    state.user = payload.user
  },
  notifyRegistered (state, boolean) {
    state.notifyRegistered = boolean
  },
  notifyReset (state, boolean) {
    state.notifyReset = boolean
  }
}
const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
