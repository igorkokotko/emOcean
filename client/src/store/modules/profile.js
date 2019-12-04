export default {
  actions: {
    // Request to the database
    async uploadProfile (ctx) {
      const profileData = {
        id: 1,
        nickname: 'Elon Musk',
        avatar_url: 'https://amp.businessinsider.com/images/5d4ae5ea100a2411da63051d-750-562.jpg',
        user_background: 'https://images.alphacoders.com/805/805180.jpg',
        status: 'My name is Elon and I like SoftServe company!',
        interests: ['nature', 'football', 'flowers'],
        likedPosts: ['postId_1', 'postId_2'],
        saved: {
          'profilesId': ['profileId_1', 'profileId_2'],
          'postIds': ['postId1', 'postId2']
        },
        // followers: ['followerID1', 'followerID2', 'followerID3'],
        followers: [
          { followerID1: 1, name: ' Leonardo DiCaprio', avatar: 'https://i.pinimg.com/236x/b0/58/7e/b0587eb904356a77d1ae21de6a30688c.jpg' },
          { followerID1: 2, name: 'Mark Zuckerberg', avatar: 'https://cdn.redmondpie.com/wp-content/uploads/2011/07/zuckerberg.jpg' },
          { followerID1: 3, name: 'Mr. President', avatar: 'https://www.newsmax.com/CMSPages/GetFile.aspx?guid=5a6582b2-683e-4d3e-afd6-17f7a223d9c1' },
          { followerID1: 4, name: 'Robot Sophia', avatar: 'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2017/10/25/1020991-741033153.jpg?itok=6JIq38s3' }
        ],
        following: [],
        is_following: true,
        counters: {
          views: '139',
          postsCount: '18',
          followersCount: '84',
          followingCount: '85'
        },
        socialAccounts: [
          { type: 'youtube', link: 'https://youtube.com' },
          { type: 'facebook', link: 'https://facebook.com' },
          { type: 'instagram', link: 'https://instagram.com' }
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
    },
    followingGetter (state) {
      return state.profile.following
    },
    followersGetter (state) {
      return state.profile.followers
    }
  }
}
