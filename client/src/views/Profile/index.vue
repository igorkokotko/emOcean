<template>
  <div>
    <div class="profile-header" :style="{ backgroundImage: `url(${profileGetter.user_background})` }">
      <div class="view-counter" v-if="profileGetter.counters">
        <i class="fas fa-eye"></i>
        {{profileGetter.counters.views}}
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-3 profile-card" >
        <profile-card :profile="profileGetter"/>
      </div>
        <div class="col-12 col-md-9 profile-content">
          <div class="col-12">
            <switch-video></switch-video>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProfileCard from './Card/index'
import SwitchVideo from './Card/switchVideo'

export default {
  computed: mapGetters(['profileGetter']),
  methods: mapActions(['uploadProfile']),
  async mounted () {
    this.uploadProfile()
  },
  components: {
    ProfileCard,
    SwitchVideo
  }
}
</script>

<style lang="scss" scoped>
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
  .profile-content {
    background-color: #9C27B0;
  }
</style>
