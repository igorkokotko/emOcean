import { getLikedList } from '@/services/post'
export default {
  actions: {
    getLikedList (ctx, videoId) {
      ctx.commit('updateLikedList', getLikedList(videoId))
    }
  },

  mutations: {
    updateLikedList (state, list) {
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
