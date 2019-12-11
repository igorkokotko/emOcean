import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  posts: {
    id_1: {
<<<<<<< HEAD
      username: '',
      userImage: '',
      postVideo: '',
      likes: 0,
      hasBeenLiked: false,
      caption: "",
=======
      username: 'socleansofreshh',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me_3.jpg',
      postVideo: '',
      likes: 3632,
      hasBeenLiked: false,
      caption: "When you're ready for summer '18 ☀️",
      comments: []
    },
    id_2: {
      username: 'djirdehh',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me2.png',
      postVideo: '',
      likes: 124,
      hasBeenLiked: false,
      caption: "Views from the six...",
      comments: []
    },
    id_3: {
      username: 'puppers',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/pug_personal.jpg',
      postVideo: '',
      likes: 49,
      hasBeenLiked: false,
      caption: "Current mood 🐶",
>>>>>>> 452f24911cbb2c628f97427c9429f03c3542b97d
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
