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
  getPreferences: (state) => {
    return state.preferences
  },
  getChosenHashTags: (state) => {
    let setTags = new Set()
    for (let obj in state.preferences) {
      if (obj.chosen) {
        setTags.add(obj.title)
      }
    }
    console.log(setTags)
    return setTags
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
