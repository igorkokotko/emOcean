<template>
  <div>
    <q-tabs
      v-model="tab"
      align="justify"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab class="text-orange" name="followers" label="followers" />
      <q-tab class="text-teal" name="following" label="following" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="scale"
      transition-next="scale"
    >
      <q-tab-panel name="followers">
        <p v-if="!followersGetter.length" class="notification">
          no followers found...
        </p>
        <followList v-else :followList="followersGetter"/>
      </q-tab-panel>

      <q-tab-panel name="following">
        <p v-if="!followingGetter.length" class="notification">
          no followings found...
        </p>
        <followList v-else :followList="followingGetter"/>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FollowList from './FollowList'
export default {
  components: {
    FollowList
  },
  computed: {
    ...mapGetters(
      { followingGetter: 'profile/followingGetter',
        followersGetter: 'profile/followersGetter' }
    ),
    profileId () {
      return localStorage.getItem('lastProfileId')
    }
  },
  methods: { ...mapActions(
    { uploadFollowers: 'profile/uploadFollowers',
      uploadFollowings: 'profile/uploadFollowings' })
  },
  data () {
    return {
      tab: this.$route.query.p
    }
  },
  mounted () {
    this.uploadFollowings(this.profileId)
    this.uploadFollowers(this.profileId)
  }
}
</script>

<style lang="scss" scoped>
  .q-tab-panels {
    margin: 10px auto;
    @media only screen and (min-width: 1024px) {
      max-width: 768px;
      background-color: #fff;
      box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
      border-radius: 4px;
    }
    .q-tab-panel {
      .notification {
        font-size: 18px;
        text-align: center;
      }
    }
  }
</style>
