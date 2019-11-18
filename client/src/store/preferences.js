const state = {
  preferences: {
    'id_1': {
      src: '/preferences/animals.jpg',
      title: 'animals',
      chosen: false
    },
    'id_2': {
      src: '/preferences/cinema.jpg',
      title: 'animals',
      chosen: false
    },
    'id_3': {
      src: '/preferences/culinary.jpg',
      title: 'animals',
      chosen: false
    },
    'id_4': {
      src: '/preferences/dance.jpg',
      title: 'animals',
      chosen: false
    },
    'id_5': {
      src: '/preferences/extreme.jpg',
      title: 'animals',
      chosen: false
    },
    'id_6': {
      src: '/preferences/game.jpg',
      title: 'animals',
      chosen: false
    },
    'id_7': {
      src: '/preferences/health.jpg',
      title: 'animals',
      chosen: false
    },
    'id_8': {
      src: '/preferences/learn.jpg',
      title: 'animals',
      chosen: false
    },
    'id_9': {
      src: '/preferences/nature.jpg',
      title: 'animals',
      chosen: false
    },
    'id_10': {
      src: '/preferences/prank.jpg',
      title: 'animals',
      chosen: false
    },
    'id_11': {
      src: '/preferences/science.jpg',
      title: 'animals',
      chosen: false
    },
    'id_12': {
      src: '/preferences/sport.jpg',
      title: 'animals',
      chosen: false
    },
    'id_13': {
      src: '/preferences/travel.jpg',
      title: 'animals',
      chosen: false
    }
  }
}
//   preferences: [
//     { src: '/preferences/animals.jpg', title: 'animals', chosen: 'false' },
//     { src: '/preferences/cinema.jpg', title: 'cinema', chosen: 'false' },
//     { src: '/preferences/culinary.jpg', title: 'culinary', chosen: 'false' },
//     { src: '/preferences/dance.jpg', title: 'dance', chosen: 'false' },
//     { src: '/preferences/extreme.jpg', title: 'extreme', chosen: 'false' },
//     { src: '/preferences/game.jpg', title: 'game', chosen: 'false' },
//     { src: '/preferences/health.jpg', title: 'health', chosen: 'false' },
//     { src: '/preferences/learn.jpg', title: 'learn', chosen: 'false' },
//     { src: '/preferences/nature.jpg', title: 'nature', chosen: 'false' },
//     { src: '/preferences/prank.jpg', title: 'prank', chosen: 'false' },
//     { src: '/preferences/science.jpg', title: 'science', chosen: 'false' },
//     { src: '/preferences/sport.jpg', title: 'sport', chosen: 'false' },
//     { src: '/preferences/travel.jpg', title: 'travel', chosen: 'false' }
//   ]
// }

const mutations = {
  updatePreference (state, payload) {
    console.log('good')
    console.log('payload:', payload)
    Object.assign(state.preferences[payload.key], payload.updates)
  }
}

const actions = {
  updatePreference ({ commit }, payload) {
    commit('updatePreference', payload)
  }
}

const getters = {
  preferences: (state) => {
    return state.preferences
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
