import {
  getProfile,
  updateProfile,
  setPreferences,
  getSubscriptionsById
} from '@/services/profile'
import axios from 'axios'

const getDefaultState = () => {
  return {
    myProfile: {},
    myProfileId: '',
    profile: {},
    profileFollowers: [],
    profileFollowings: [],
    currentProfileFollowings: []
  }
}

export default {
  namespaced: true,

  actions: {
    clear ({ commit }) {
      commit('clear')
    },
    updateMyProfile (ctx, editedData) {
      return updateProfile(editedData)
    },
    getMyProfile (ctx) {
      return getProfile({ id: ctx.state.myProfileId })
        .then((response) => {
          ctx.commit('updateMyProfile', response.data.profile)
        })
    },
    updateMyProfileId (ctx, myProfileId) {
      return ctx.commit('updateMyProfileId', myProfileId)
    },
    uploadProfile ({ commit }, nickname) {
      axios
        .get('/api/profiles/get-profile?nickname=' + nickname)
        .then(response => {
          commit('updateProfile', response.data.profile)
        })
        .catch(error => {
          if (error) {
            commit('updateProfile', [])
          }
        })
    },
    uploadFollowers ({ commit }, id) {
      axios
        .get('/api/profiles/get-followers/' + id)
        .then(response => {
          commit('updateFollowers', response.data.followers)
        })
        .catch(error => {
          if (error) {
            commit('updateFollowers', [])
          }
        })
    },
    clearSubs ({ commit }) {
      commit('clearSubscriptions')
    },
    async uploadSubscriptions ({ commit }, data) {
      try {
        commit('setLoading', true)
        const response = await getSubscriptionsById(data.id, data.type)
        commit('setLoading', false)
        commit('updateSubscriptions', { type: data.type, data: response.data.result.data })
      } catch (error) {
        commit('setLoading', false)
        commit('setErrors', error.response.data)
        commit('updateSubscriptions', { type: data.type, data: [] })
      }
    },
    uploadProfileAction ({ commit }, data) {
      axios
        .get('/api/profiles/profile-action?action=' + data.action + '&id=' + data.id)
        .then(response => {
          commit('', response.data)
        })
        .catch(error => console.log(error.response.data))
    },
    async setPreferencesAction ({ commit }, preferences) {
      await setPreferences({ preferences })
      commit('setPreferences', preferences)
    }
  },

  mutations: {
    clear (state) {
      Object.assign(state, getDefaultState())
    },
    updateMyProfile (state, myProfileData) {
      state.myProfile = myProfileData
    },
    updateMyProfileId (state, myProfileId) {
      state.myProfileId = myProfileId
    },
    updateProfile (state, profileData) {
      state.profile = profileData
    },
    clearSubscriptions (state) {
      state.profileFollowers = []
      state.profileFollowings = []
    },
    updateSubscriptions (state, profileData) {
      if (profileData.type === 'followings') {
        state.profileFollowings = profileData.data
      } else if (profileData.type === 'followers') {
        state.profileFollowers = profileData.data
      }
    }
  },

  state: getDefaultState(),

  getters: {
    profileGetter (state) {
      window.localStorage.setItem('lastProfileId', state.profile.profile_id)
      return state.profile
    },
    followingGetter (state) {
      return state.profileFollowings
    },
    followersGetter (state) {
      return state.profileFollowers
    },
    myProfile (state) {
      return state.myProfile
    },
    myProfileId (state) {
      return state.myProfileId
    },
    setPreferences (state, data) {
      state.myProfile.preferences = data
    }
  }
}
