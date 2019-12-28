import {
  getPostsByViews,
  getPostsByPreferences,
  getPostsByFollowings,
  getPostsByTag,
  getUserPostsById,
  savePost
} from '@/services/posts'

const state = {
  posts: [],
  pagination: '',
  errors: [],
  loading: false,
  userPosts: []
}

const mutations = {
  setUserPosts (state, payload) {
    state.userPosts = payload
  },
  clearUserPosts (state) {
    state.userPosts = []
  },
  addPost (state, payload) {
    state.posts = [payload.post, ...state.posts]
  },
  updatePosts (state, payload) {
    state.posts = payload.posts
    state.pagination = payload.lastIndex
  },
  updateErrors (state, payload) {
    state.errors = [...state.errors, payload]
  },
  setPosts (state, payload) {
    if (state.posts.length > 0) {
      state.posts = [...state.posts, ...payload.data]
    } else {
      state.posts = payload.data
    }
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
    console.log(payload)
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
    commit('likePost', postId)
  }
}

const getters = {
  postsGetter: state => {
    return state.posts.sort((a, b) => b.createdAt - a.createdAt)
  },
  paginationGetter: state => {
    return state.pagination
  },
  errorsGetter: state => {
    return state.errors
  },
  loadingGetter: state => {
    return state.loading
  },
  userPostsGetter: state => {
    return state.userPosts.sort((a, b) => b.createdAt - a.createdAt)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
