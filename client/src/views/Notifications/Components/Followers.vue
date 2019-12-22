<template>
  <div>
    <q-list>
      <q-item v-for="follower in followers" :key="follower.id" class="q-my-sm" clickable>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <img :src="`https://cdn.quasar.dev/img/${follower.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <strong style="color:#333;">{{ follower.name }}</strong>
            <em>started following you.</em>
          </q-item-label>
          <q-item-label caption lines="1">{{ $moment( parseInt(follower.date) ).fromNow() }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            class="follow-btn"
            v-if="!follower.followed"
            @click="updatefollow(follower)"
            unelevated
            rounded
            size="sm"
            label="Follow"
          />
          <q-btn
            class="unfollow-btn"
            v-if="follower.followed"
            @click="updatefollow(follower)"
            unelevated
            outline
            rounded
            size="sm"
            label="Unfollow"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
const followers = [{
  id: 1,
  name: 'Ruddy Jedrzej',
  date: '1574273808162',
  followed: true,
  text: 'Good photo',
  avatar: 'avatar1.jpg',
  post_url: '../preferences/animals.jpg'
}
]
export default {
  name: 'followers',
  data () {
    return {
      followers
    }
  },
  methods: {
    updatefollow: (follower) => {
      follower.followed = !follower.followed
    }
  },
  mounted () {
    followers.sort((a, b) => {
      return b.date - a.date
    })
  }
}
</script>
<style lang="scss" scoped>
.video-preview img {
  border: 2px solid #e91e63;
}
.follow-btn {
  background: #4db6ac;
  color: #fff;
}
.unfollow-btn {
  color: #333;
  border-color: #13c4c4;
}
</style>
