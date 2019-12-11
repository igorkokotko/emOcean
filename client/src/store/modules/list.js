import axios from 'axios'
const staticLikes = [{
  id: 1,
  user_id: "0jLDJvvFnBUsyAQaIap1AhRsXSH3",
  name: 'Ruddy Jedrzej',
  date: '1570062998222',
  avatar: 'avatar1.jpg'
}, {
  id: 2,
  user_id: "0jLDJvvFnBUsyAQaIap1AhRsXSH3",
  name: 'Jan Khalib',
  date: '1572273790143',
  avatar: 'avatar2.jpg'
}, {
  id: 3,
  user_id: "0jLDJvvFnBUsyAQaIap1AhRsXSH3",
  name: 'Gorge Lebiskiy',
  date: '1574291790682',
  avatar: 'avatar4.jpg'
}, {
  id: 4,
  user_id: "0jLDJvvFnBUsyAQaIap1AhRsXSH3",
  name: 'Dayana Fawdrey',
  date: '1574073740192',
  avatar: 'avatar3.jpg'
}, {
  id: 5,
  user_id: "0jLDJvvFnBUsyAQaIap1AhRsXSH3",
  name: 'Mallorie Zuck',
  date: '1574291846223',
  avatar: 'avatar2.jpg'
}, {
  id: 6,
  user_id: "0jLDJvvFnBUsyAQaIap1AhRsXSH3",
  name: 'Mallorie Zuck',
  date: '1575762998222',
  avatar: 'avatar2.jpg'
}, {
  id: 7,
  user_id: "0jLDJvvFnBUsyAQaIap1AhRsXSH3",
  name: 'Gorge Lebiskiy',
  date: '1575062998222',
  avatar: 'avatar4.jpg'
}]
export default {
  actions: {
    getLikedList (ctx, videoId) {
      axios.get(`/api/posts/get-post-likes/${videoId}`)
        .then((response) => {
          ctx.commit('updateLikedList', response.data.result)
        })
    },
    updateList (ctx) {
      ctx.commit('updateLikedList', staticLikes)
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
