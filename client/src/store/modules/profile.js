export default {
  actions: {
    // Request to the database
    async uploadProfile (ctx) {
      const profileData = {
        nickname: 'Jaden Smith',
        bio: "My name is Khris, and i'm profile creator",
        avatar_url: 'https://media.licdn.com/dms/image/C5603AQGBn4_HoHYEDA/profile-displayphoto-shrink_200_200/0?e=1578528000&v=beta&t=seJnvBNJi1J9QlTbVBSZnZGLwRyZDTkxlfNhUM6VagU',
        status: 'I also have a friend Danylo. He is really cool programmer.',
        user_background: 'https://images.alphacoders.com/805/805180.jpg',
        interests: ['nature', 'football', 'flowers'],
        likedPosts: ['postId_1', 'postId_2'],
        saved: {
          'profilesId': ['profileId_1', 'profileId_2'],
          'postIds': ['postId1', 'postId2']
        },
        followers: ['followerID'],
        following: ['followingID'],
        is_following: true,
        counters: {
          views: '139k',
          postsCount: '18',
          followersCount: '84',
          followingCount: '85'
        },
        socialAccounts: [
          { type: 'youtube', link: 'youtube.com' },
          { type: 'facebook', link: 'facebook.com' },
          { type: 'instagram', link: 'instagram.com' }
        ]
      }
      ctx.commit('updateProfile', profileData)
    }
  },
  mutations: {
    updateProfile (state, profileData) {
      state.profile = profileData
    }
  },
  state: {
    profile: {}
  },
  getters: {
    profileGetter (state) {
      return state.profile
    }
  }
}
