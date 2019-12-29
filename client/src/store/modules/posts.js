import {
  getPostsByType,
  savePost
} from '@/services/post'

const getDefaultState = () => {
  return {
    posts: [],
    index: 'Last index',
    errors: [],
    loading: false
  }
}

const state = getDefaultState()

const mutations = {
  clear (state) {
    Object.assign(state, getDefaultState())
  },
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
  },
  dislikePost (state, postId) {
    const userId = localStorage.getItem('profileId')
    return state.posts.forEach(function (value) {
      if (value.postId === postId) {
        value.likes.filter(function (elem) {
          return elem !== userId
        })
        value.likesCount--
      }
    })
  },
  likePost (state, postId) {
    const userId = localStorage.getItem('profileId')
    return state.posts.forEach(function (value) {
      if (value.postId === postId) {
        value.likes.push(userId)
        value.likesCount++
      }
    })
  }
}

const actions = {
  clear ({ commit }) {
    commit('clear')
  },
  async getUserPostsAction ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearUserPosts')
    getUserPostsById(payload)
      .then(res => {
        commit('setLoading', false)
        commit('setUserPosts', res.data.result)
      })
      .catch(err => {
        commit('updateErrors', err.response.data)
        commit('clearUserPosts')
        commit('setLoading', false)
      })
  },
  addPostAction ({ commit }, payload) {
    commit('clearPosts')
    savePost(payload)
      .then(res => {
        commit('addPost', { post: res.data.result })
      })
      .catch(err => {
        commit('updateErrors', err.response.data)
      })
  },
  getPostsByViewsAction ({ commit }, payload) {
    commit('clearPosts')
    commit('setLoading', true)
    getPostsByViews(payload)
      .then(res => {
        commit('clearPosts')
        commit('setPosts', res.data.result)
        commit('setLoading', false)
      })
      .catch(err => {
        commit('updateErrors', err.response.data)
        commit('setLoading', false)
      })
  },
  getPostsByPreferencesAction ({ commit }, payload) {
    commit('clearPosts')
    commit('setLoading', true)
    getPostsByPreferences(payload)
      .then(res => {
        commit('clearPosts')
        commit('setPosts', res.data.result)
        commit('setLoading', false)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('updateErrors', err.response.data)
      })
  },
  getPostsByFollowingsAction ({ commit }, payload) {
    commit('clearPosts')
    commit('setLoading', true)
    getPostsByFollowings(payload)
      .then(res => {
        commit('clearPosts')
        commit('setPosts', { data: res.data.result })
        commit('setLoading', false)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('updateErrors', err.response.data)
      })
  },
  getPostsByTagAction ({ commit }, payload) {
    commit('clearPosts')
    commit('setLoading', true)
    getPostsByTag(payload)
      .then(res => {
        if (res.data.result === 'No more posts left') {
          commit('setLoading', false)
        } else {
          commit('clearPosts')
          commit('setPosts', { data: res.data.result.data })
          commit('setLoading', false)
        }
      })
      .catch(err => {
        commit('setLoading', false)
        commit('updateErrors', err.response.data)
      })
  },
  clearPostsAction ({ commit }) {
    commit('clearPosts')
  },
  dislikePost ({ commit }, postId) {
    commit('dislikePost', postId)
  },
  likePost ({ commit }, postId) {
    commit('likePost', postId),
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
  },
  clearPostsAction ({ commit }) {
    commit('clearPosts')
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
