<template>
  <q-item class="follow-item">
    <q-item-section avatar>
      <avatar
        class="follow-avatar"
        :img="item.avatar"
        :size="'30'"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="name">
        <strong>{{ item.name }} </strong>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <FollowButton class="follow-btn"></FollowButton>
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
      // need to save this item to localStorage when u authorization
      // for ex. localStorage.currentUserId = user.id
      currentUserId: localStorage.getItem('currentUserId')
    }
  },
  computed: mapGetters(['followingIdsGetter']),
  mounted () {
    this.uploadFollowings(this.currentUserId)
  },
  methods: mapActions(['uploadFollowings'])
}
</script>

<style>
</style>
