<template>
  <div class="profile-card">
      <div class="user-avatar">
        <img :src="profile.avatar_url" alt="avatar"/>
        <i v-if="popularAccount" class="fas fa-star" title="Popular account"></i>
      </div>
    <div class="card-content">
      <h2 class="name">
        {{profile.nickname}}
      </h2>
      <follow-button :following="profile.is_following"></follow-button>
      <p class="decription">
        {{profile.status}}
      </p>
      <card-footer :footerCountInfo="profile.counters" :socialAccounts="profile.socialAccounts"></card-footer>
    </div>
  </div>
</template>

<script>
import CardFooter from './cardFooter'
import FollowButton from './followBtn'

export default {
  components: {
    CardFooter,
    FollowButton
  },
  props: {
    profile: Object
  },
  data () {
    return {
      popularAccountLimit: 10
    }
  },
  computed: {
    popularAccount () {
      return this.profile.counters.followersCount > this.popularAccountLimit
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile-card {
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
