<template>
  <div class="profile-card">
      <div class="user-avatar">
        <img :src="profile.avatar_url" alt="avatar"/>
        <i v-if="profile.counters.views > 100" class="fas fa-star" title="More than 100 views"></i>
      </div>
    <div class="card-content">
      <h2 class="name">
        {{profile.nickname}}
      </h2>
<!--for future <follow-button v-if="profileData.id != $parent.me.id"></follow-button>-->
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
  props: {
    profile: Object
  },
  components: {
    CardFooter,
    FollowButton
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
