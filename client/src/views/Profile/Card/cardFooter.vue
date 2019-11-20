<template>
  <div class="profile-footer">
    <nav class="stats row">
      <router-link to="/followers">
        <a href="#" class="stat">
          <div class="stat-count" v-if="footerCountInfo">
            {{ footerCountInfo.followersCount }}
          </div>
          <div class="stat-title">
            Followers
          </div>
        </a>
      </router-link>
      <router-link to="/posts">
        <a href="#" class="stat">
          <div class="stat-count" v-if="footerCountInfo">
            {{ footerCountInfo.postsCount }}
          </div>
          <div class="stat-title">
            Posts
          </div>
        </a>
      </router-link>
      <router-link to="/following">
        <a href="#" class="stat">
          <div class="stat-count" v-if="footerCountInfo">
            {{ footerCountInfo.followingCount }}
          </div>
          <div class="stat-title">
            Following
          </div>
        </a>
      </router-link>
    </nav>
    <div class="social-accounts">
      <a v-for="account in socialAccounts" :title="`Come and find me in the ${account.type}`" :key="account.type" :href="account.link" class="social-icon" :class="`social-icon--${account.type}`">
        <i class="fab" :class="`fa-${account.type}`"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    footerCountInfo: Object,
    socialAccounts: Array
  }
}
</script>

<style lang="scss" scoped>
  $social-icon-colors: (
    "facebook": #3b5999,
    "youtube": #FF0000,
    "instagram": #e4405f
  );
  .profile-footer > * {
    margin-bottom: 15px;
  }
  .social-accounts {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .social-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 15px;
      border: 1px solid;
      border-radius: 50%;
      outline: none;
      width: 40px;
      height: 40px;
      text-decoration: none;
      background-color: white;
      transition: 0.3s;
      .fab {
        font-size: 17px;
      }
      @each $name, $color in $social-icon-colors {
        &--#{$name} {
          color: $color;
        &:hover {
           background-color: $color ;
         }
        &:hover i {
           color: white;
         }
       }
      }
    }
  }
  .stats {
    display: flex;
    justify-content: space-around;
    & > * {
      margin: 0 5px;
    }
    .stat-count {
      font-weight: 600;
      font-size: 16px;
    }
    .stat-title {
      text-transform: uppercase;
      font-size: 11px;
    }
  }
</style>
