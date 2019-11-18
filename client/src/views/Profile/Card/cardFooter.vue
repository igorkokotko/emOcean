<template>
  <div class="profile-footer">
    <nav class="stats row">
      <router-link class="col-4" to="/">
        <a href="#" class="stat">
          <div class="stat-count" v-if="footerCountInfo">
            {{ footerCountInfo.postsCount }}
          </div>
          <div class="stat-titile">
            Posts
          </div>
        </a>
      </router-link>
      <router-link class="col-4" to="/">
        <a href="#" class="stat">
          <div class="stat-count" v-if="footerCountInfo">
            {{ footerCountInfo.followersCount }}
          </div>
          <div class="stat-titile">
            Followers
          </div>
        </a>
      </router-link>
      <router-link class="col-4" to="/settings">
        <a href="#" class="stat">
          <div class="stat-count" v-if="footerCountInfo">
            {{ footerCountInfo.followingCount }}
          </div>
          <div class="stat-titile">
            Following
          </div>
        </a>
      </router-link>
    </nav>
    <div class="social-accounts">
      <a v-for="account in socialAccounts" :key="account.type" :href="account.link" class="social-button" :class="`social-button--${account.type}`">
        <i class="fab fa-facebook-f"></i>
      </a>
<!--      <a href="#" class="social-button  social-button&#45;&#45;linkedin">-->
<!--        <i class="fab fa-linkedin-in"></i>-->
<!--      </a>-->
<!--      <a href="#" class="social-button social-button&#45;&#45;instagram">-->
<!--        <i class="fab fa-snapchat-ghost"></i>-->
<!--      </a>-->
<!--      <a href="#" class="social-button social-button&#45;&#45;github">-->
<!--        <i class="fab fa-snapchat-ghost"></i>-->
<!--      </a>-->
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
  $social-button-colors: (
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
    .social-button {
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
      @each $name, $color in $social-button-colors {
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
    .stat-count {
      font-weight: 600;
      font-size: 16px;
    }
    .stat-titile {
      text-transform: uppercase;
      font-size: 12px;
    }
  }
</style>
