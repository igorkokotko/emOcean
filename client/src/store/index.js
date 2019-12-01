import preferences from './preferences'
import posts from './posts'

import Vue from 'vue'
import Vuex from 'vuex'
import profile from './modules/profile'
import auth from './modules/authentication.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    profile,
    auth,
    posts,
    preferences: preferences
  }
})
