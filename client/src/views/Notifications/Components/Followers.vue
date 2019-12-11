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
            @click="follow(follower)"
            unelevated
            rounded
            size="sm"
            label="Follow"
          />
          <q-btn
            class="unfollow-btn"
            v-if="follower.followed"
            @click="unfollow(follower)"
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
}, {
  id: 2,
  name: 'Mallorie Zuck',
  date: '1574273790143',
  followed: true,
  text: 'Really nice...',
  avatar: 'avatar2.jpg',
  post_url: '../preferences/animals.jpg'
}, {
  id: 3,
  name: 'George Lebiskiy',
  date: '1574334498716',
  followed: false,
  text: 'It was really cool, I find two new friends.',
  avatar: 'avatar4.jpg',
  post_url: '../preferences/fun.jpg'
}, {
  id: 4,
  name: 'Dayana Fawdrey',
  date: '1574333011326',
  followed: false,
  text: 'Happy birthday to you! Have a great time, with memories to last you throughout the whole year',
  avatar: 'avatar3.jpg',
  post_url: '../preferences/dance.jpg'
}]
export default {
  name: 'followers',
  data () {
    return {
      followers
    }
  },
  methods: {
    follow: (follower) => {
      console.log('follow')
      follower.followed = true
    },
    unfollow: (follower) => {
      console.log('unfollow')
      follower.followed = false
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
