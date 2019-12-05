import authService from '@/services/auth'

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
    }
  },

  mutations: {
    updateMyProfile (state, myProfileData) {
      state.myProfile = myProfileData
    },
    updateMyProfileId (state, myProfileId) {
      state.myProfileId = myProfileId
    }
  },

  state: {
    myProfile: {},
    myProfileId: ''
  },

  getters: {
    myProfile (state) {
      return state.myProfile
    }
  }
}
