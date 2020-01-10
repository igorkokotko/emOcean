<template>
  <div v-if="!blocked">
    <div class="profile-header" :style="{ backgroundImage: userBackground }"></div>
    <div class="row wrapp">
      <div class="col-12 col-md-3 profile-card">
        <profile-card :profile="profileGetter" />
      </div>
      <div class="col-12 col-md-9 profile-content">
        <div class="col-12">
          <switch-video></switch-video>
        </div>
      </div>
    </div>
    <to-top-anchor></to-top-anchor>
  </div>
  <div v-else>
    <q-banner class="bg-primary text-white banner">
      <q-icon name="warning" class="text-white" style="font-size: 4rem;" />
      <p class="block-banner-message">Unfortunately, you have been blocked by this user</p>
    </q-banner>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProfileCard from './Card/index'
import switchVideo from './Card/switchVideo'
import toTopAnchor from '../../components/ToTopAnchor'
export default {
  components: {
    ProfileCard,
    switchVideo,
    toTopAnchor
  },
  data () {
    return {
      blocked: false
    }
  },
  computed: {
    ...mapGetters({
      profileGetter: 'profile/profileGetter',
      userPosts: 'posts/userPostsGetter',
      errorGetter: 'profile/errorGetter'
    }),
    userBackground () {
      return this.profileGetter.user_background ? 'url(' + this.profileGetter.user_background + ')' : 'url(https://i.ytimg.com/vi/DiS7ZMwTA0I/maxresdefault.jpg)'
    },
    nickname () {
      return this.$route.params.nickname
    }
  },
  async created () {
    await this.uploadProfile(this.nickname)
    const blocks = this.errorGetter.filter(el => el.error === "You have been blocked by this user")
    if (blocks.length !== 0) {
      this.blocked = true
      this.deleteError()
    } else {
      this.blocked = false
    }
    this.getUserPosts(this.profileGetter.userId)
  },
  mounted () {
    this.uploadProfile(this.nickname)
  },
  methods: {
    ...mapActions({
      uploadProfile: 'profile/uploadProfile',
      getUserPosts: 'posts/getUserPostsAction',
      deleteError: 'profile/deleteError'
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.path.startsWith('/profile')) {
      this.uploadProfile(to.params.nickname)
    }
    next()
  },
  watch: {
    async nickname () {
      await this.uploadProfile(this.nickname)
      const blocks = this.errorGetter.filter(el => el.error === "You have been blocked by this user")
      if (blocks.length !== 0) {
        this.blocked = true
        this.deleteError()
      } else {
        this.blocked = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapp {
    min-height: calc(100vh - 260px);
    .profile-content {
      background: url("https://img5.goodfon.ru/wallpaper/nbig/1/ab/zima-sneg-snezhinki-fon-christmas-blue-winter-background-s-7.jpg");
    }
  }
  .profile-header {
    background-position: center;
    background-size: cover;
    height: 200px;
    position: relative;
    .view-counter {
      position: absolute;
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      top: 25px;
      border-radius: 20px 0 0 20px;
      right: 0;
      padding: 5px;
      background-color: white;
      .fa-eye {
        margin-right: 5px;
        color: blue;
      }
    }
  }
</style>