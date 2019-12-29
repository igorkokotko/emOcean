import { getProfile, updateProfile, setPreferences } from '@/services/profile'
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
    uploadFollowings ({ commit }, id) {
      axios
        .get('/api/profiles/get-followings/' + id)
        .then(response => {
          commit('updateFollowings', response.data.followings)
        })
        .catch(error => {
          if (error) {
            commit('updateFollowings', [])
          }
        })
    },
    uploadCurrentFollowings ({ commit }, id) {
      axios
        .get('/api/profiles/get-followings/' + id)
        .then(response => {
          commit('updateCurrentFollowings', response.data.followings)
        })
        .catch(error => {
          if (error) {
            commit('updateCurrentFollowings', [])
          }
        })
    },
    // action for follow/unfollow, block/unblock user
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
    updateFollowers (state, profileData) {
      state.profileFollowers = profileData
    },
    updateFollowings (state, profileData) {
      state.profileFollowings = profileData
    },
    updateCurrentFollowings (state, profileData) {
      state.currentProfileFollowings = profileData
    }
  },

  state: getDefaultState(),

  getters: {
    profileGetter (state) {
      // localStorage.lastProfileId = state.profile.profile_id
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
    followingIdsGetter (state) {
      let followingIds = []
      state.currentProfileFollowings.map(function (value, key) {
        followingIds.push(value.id)
      })
      return followingIds
    },
    setPreferences (state, data) {
      state.myProfile.preferences = data
    }
  }
}
