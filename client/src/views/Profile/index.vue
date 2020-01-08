<template>
  <div>
    <div class="profile-header" :style="{ backgroundImage: userBackground }"></div>
    <div class="row wrapp">
      <div class="col-12 col-md-3 profile-card" >
        <profile-card :profile="profileGetter"/>
      </div>
        <div class="col-12 col-md-9 profile-content">
          <div class="col-12">
            <switch-video></switch-video>
          </div>
        </div>
    </div>
    <to-top-anchor></to-top-anchor>
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
  computed: {
    ...mapGetters({ profileGetter: 'profile/profileGetter' }),
    userBackground () {
      return this.profileGetter.user_background ? 'url(' + this.profileGetter.user_background + ')' : 'url(https://i.ytimg.com/vi/DiS7ZMwTA0I/maxresdefault.jpg)'
    },
    nickname () {
      return this.$route.params.nickname
    }
  },
  mounted () {
    this.uploadProfile(this.nickname)
  },
  methods: {
    ...mapActions({ uploadProfile: 'profile/uploadProfile' })
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
