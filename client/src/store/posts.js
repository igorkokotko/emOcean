import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  posts: {
    id_1: {
      username: 'socleansofreshh',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me_3.jpg',
      postVideo: 'https://firebasestorage.googleapis.com/v0/b/emocean-74133.appspot.com/o/profiles%2Fvideoplayback.mp4?alt=media&token=1595d9f7-9e0c-459b-ae25-06ee4ac19cb2',
      likes: 36,
      hasBeenLiked: false,
      caption: "When you're ready for summer '18 ☀️",
      comments: []
    },
    id_2: {
      username: 'djirdehh',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me2.png',
      postVideo: 'https://firebasestorage.googleapis.com/v0/b/emocean-74133.appspot.com/o/profiles%2Fvideoplayback.mp4?alt=media&token=1595d9f7-9e0c-459b-ae25-06ee4ac19cb2',
      likes: 20,
      hasBeenLiked: false,
      caption: "Views from the six...",
      comments: []
    },
    id_3: {
      username: 'puppers',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/pug_personal.jpg',
      postVideo: 'https://firebasestorage.googleapis.com/v0/b/emocean-74133.appspot.com/o/profiles%2Fvideoplayback.mp4?alt=media&token=1595d9f7-9e0c-459b-ae25-06ee4ac19cb2',
      likes: 49,
      hasBeenLiked: false,
      caption: "Current mood 🐶",
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
