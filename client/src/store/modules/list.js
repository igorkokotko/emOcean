import axios from 'axios'

export default {
  actions: {
    getLikedList (ctx, videoId) {
      axios.get(`/api/posts/get-post-likes/${videoId}`)
        .then((response) => {
          console.log(response.data.result)
          ctx.commit('updateLikedList', response.data.result)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  mutations: {
    updateLikedList (state, list) {
      list.sort((a, b) => {
        return b.date - a.date
      })
      state.list = list
    }
  },

  state: {
    list: []
  },

  getters: {
    getLikes (state) {
      return state.list
    }
  }
}
