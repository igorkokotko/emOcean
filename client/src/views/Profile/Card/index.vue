<template>
  <div class="profile-card">
      <div class="user-avatar">
        <img :src="profile.avatar_url" alt="avatar"/>
<!--        <i v-if="popularAccount" class="fas fa-star" title="Popular account"></i>-->
      </div>
    <div class="card-content">
      <h2 class="name">
        {{profile.nickname}}
      </h2>
      <follow-button v-if="currentUserId !== profile.profile_id" :following="followingIdsGetter.includes(profile.profile_id)" :id="profile.profile_id"></follow-button>
      <p class="decription">
        {{profile.status}}
      </p>
      <card-footer :following="profile.followings" :followers="profile.followers" :socialAccounts="profile.socialAccounts"></card-footer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardFooter from './cardFooter'
import FollowButton from './followBtn'

export default {
  computed: {
    ...mapGetters({ followingIdsGetter: 'profile/followingIdsGetter' }),
    lastProfileId () {
      return localStorage.getItem('lastProfileId')
    },
    currentUserId () {
      return localStorage.getItem('profileId')
    }
  },
  methods: mapActions(
    { uploadCurrentFollowings: 'profile/uploadCurrentFollowings' }
  ),
  data () {
    return {
      popularAccountLimit: 100,
      isFollowing: false
    }
  },
  props: {
    profile: Object
  },
  components: {
    CardFooter,
    FollowButton
  },
  mounted () {
    this.uploadCurrentFollowings(this.currentUserId)
  }
}
</script>

<style lang="scss" scoped>
  .profile-card {
    height: 100%;
    position: relative;
    .user-avatar {
      position: absolute;
      top: -105px;
      margin-right: -70px;
      right: 50%;
      width: 140px;
      height: 140px;
      border: 2px white solid;
      border-radius: 50%;
      .fa-star {
        display: inline-block;
        position: absolute;
        color: gold;
        font-size: 20px;
        right: 5px;
        top: 15px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .card-content {
      padding: 50px 15px 0;
      text-align: center;
      background-color: white;
      height: 100%;
      & > * {
        margin-bottom: 15px;
      }
      .name {
        font-family: "Roboto Slab", "Times New Roman", serif;
        font-weight: 700;
        font-size: 24px;
        line-height: 1.5;
      }
      .decription {
        color: #3C4857;
        font-weight: 300;
      }
    }
  }
</style>
