import authService from '@/services/auth'
import axios from 'axios'

export default {
  namespaced: true,

  actions: {
    updateMyProfile (ctx, editedData) {
      return authService.updateProfile(editedData)
      /* .then((response) => {
          ctx.commit('updateMyProfile', response.data.profile)
        }) */
    },
    getMyProfile (ctx) {
      return authService.getProfile({ id: ctx.state.myProfileId })
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
        .catch(error => console.log(error))
    },
    uploadFollowers ({ commit }, id) {
      axios
        .get('/api/profiles/get-followers/' + id)
        .then(response => {
          commit('updateFollowers', response.data)
        })
        .catch(error => console.log(error))
    },
    uploadFollowings ({ commit }, id) {
      axios
        .get('/api/profiles/get-followings/' + id)
        .then(response => {
          commit('updateFollowings', response.data)
        })
        .catch(error => console.log(error))
    }
  },

  mutations: {
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
      state.profile.followers = profileData
    },
    updateFollowings (state, profileData) {
      state.profile.following = profileData
    }
  },

  state: {
    myProfile: {},
    myProfileId: '',
    profile: {}
  },

  getters: {
    profileGetter (state) {
      localStorage.lastProfileId = state.profile.profileId
      return state.profile
    },
    followingGetter (state) {
      return state.profile.following
    },
    followersGetter (state) {
      return state.profile.followers
    },
    myProfile (state) {
      return state.myProfile
    }
  }
}
