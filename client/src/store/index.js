import preferences from './preferences'

import Vue from 'vue'
import Vuex from 'vuex'
import profile from './modules/profile'
import auth from './modules/authentication.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    profile,
    auth,
    preferences: preferences
  }
})
