import {
  getPostsByType,
  savePost
} from '@/services/posts'

const state = {
  posts: [],
  index: 'Last index',
  errors: [],
  loading: false
}

const mutations = {
  addPost (state, payload) {
    state.posts = [payload.post, ...state.posts]
  },
  updateErrors (state, payload) {
    state.errors = [...state.errors, payload]
  },
  setPosts (state, payload) {
    state.posts = state.posts.concat(...payload)
  },
  setIndex (state, payload) {
    state.index = payload
  },
  clearPosts (state) {
    state.posts = []
  },
  setLoading (state, payload) {
    state.loading = payload
  }
}

const actions = {
  async addPostAction ({ commit }, payload) {
    try {
      commit('setLoading', true)
      const response = await savePost(payload)
      commit('addPost', { post: response.data.result })
      commit('setLoading', false)
    } catch (err) {
      commit('updateErrors', err.response.data)
      commit('setLoading', false)
    }
  },
  async getPostsAction ({ commit }, payload) {
    try {
      commit('setLoading', true)
      if (!payload.index) {
        commit('clearPosts')
        commit('setIndex', 'Last index')
      }
      const response = await getPostsByType(payload)
      commit('setPosts', response.data.result.data)
      commit('setIndex', response.data.result.lastIndex)
      commit('setLoading', false)
    } catch (error) {
      if (error.response.data.error === 'No more posts left') {
        commit('setIndex', 'Last index')
      }
      commit('updateErrors', error.response.data)
      commit('setLoading', false)
    }
  }
}

const getters = {
  postsGetter: state => {
    return state.posts
  },
  paginationIndexGetter: state => {
    return state.index
  },
  errorsGetter: state => {
    return state.errors
  },
  loadingGetter: state => {
    return state.loading
  },
  emptyPostsMessageGetter: state => {
    return state.emptyPostsMessage
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
