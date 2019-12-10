<template>
  <q-item class="follow-item" v-if="item">
    <q-item-section avatar>
      <avatar
        class="follow-avatar"
        :img="item.avatar_url"
        :size="'30'"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="name">
        <router-link :to="{ name: 'profile', params: { nickname: item.nickname }}">
          <strong>{{ item.nickname }} </strong>
        </router-link>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <FollowButton class="follow-btn" v-if="currentUserId !== item.id" :following="followingIdsGetter.includes(item.id)" :id="item.id"></FollowButton>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FollowButton from '../Profile/Card/followBtn'
import Avatar from '../../components/Avatar'

export default {
  components: {
    FollowButton,
    Avatar
  },
  props: {
    item: Object
  },
  data () {
    return {
    }
  },
  computed: { ...mapGetters({ followingIdsGetter: 'profile/followingIdsGetter' }),
    currentUserId () {
      return localStorage.getItem('profileId')
    }
  },
  mounted () {
    this.uploadCurrentFollowings(this.currentUserId)
  },
  methods: mapActions({ uploadCurrentFollowings: 'profile/uploadCurrentFollowings' })
}
</script>

<style>
</style>
