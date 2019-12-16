<template>
  <div v-touch-swipe.left="handleSwipe" v-touch-swipe.right="handleSwipe">
    <q-tabs
      v-model="tab"
      align="justify"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab class="text-orange" name="comments" label="Comments" />
      <q-tab class="text-teal" name="likes" label="Likes" />
      <q-tab class="text-purple" name="followings" label="Followings" />
    </q-tabs>
    <comments-list v-if="tab=='comments'" />
    <likes-list v-if="tab=='likes'" />
    <followers-list v-if="tab=='followings'" />
  </div>
</template>
<script>
import CommentsList from './Components/Comments.vue'
import LikesList from './Components/Likes.vue'
import FollowersList from './Components/Followers.vue'

export default {
  data () {
    return {
      tab: 'likes'
    }
  },
  components: {
    CommentsList,
    LikesList,
    FollowersList
  },
  methods: {
    handleSwipe: function (obj) {
      let dir = obj.direction
      if (this.tab === 'likes') {
        if (dir === 'left') {
          this.tab = 'followings'
        }
        if (dir === 'right') {
          this.tab = 'comments'
        }
      } else {
        if (dir === 'left' && this.tab === 'comments') {
          this.tab = 'likes'
        }
        if (dir === 'right' && this.tab === 'followings') {
          this.tab = 'likes'
        }
      }
    }
  }
}
</script>
<style>
body {
  background: #fff;
}
</style>
