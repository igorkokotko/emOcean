import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  posts: {
    id_1: {
      username: '',
      userImage: '',
      postVideo: '',
      likes: 0,
      hasBeenLiked: false,
      caption: "",
      comments: []
    }
  }
}

const mutations = {
  updateLikes (state, payload) {
    payload.updates.hasBeenLiked ? payload.updates.likes-- : payload.updates.likes++
    payload.updates.hasBeenLiked = !payload.updates.hasBeenLiked
    Object.assign(state.posts[payload.key], payload.updates)
  },
  addPost (state, payload) {
    Vue.set(state.posts, payload.id, payload.post)
  },
  updateState (state, payload) {
    state.posts = payload
  }
}

const actions = {
  updateLikes ({ commit }, payload) {
    commit('updateLikes', payload)
  },
  addPost ({ commit }, post) {
    let postID = uid()
    let payload = {
      id: postID,
      post: post
    }
    commit('addPost', payload)
  },
  updateState ({ commit }, payload) {
    commit('updateState', payload)
  }
}

const getters = {
  getPosts: (state) => {
    return state.posts
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
