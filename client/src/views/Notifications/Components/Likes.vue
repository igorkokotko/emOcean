<template>
  <div>
    <q-list>
      <q-item v-for="like in likes" :key="like.id" class="q-my-sm" clickable>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <img :src="`https://cdn.quasar.dev/img/${like.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ like.name }}</q-item-label>
          <q-item-label caption lines="1">{{ $moment( parseInt(like.date) ).fromNow() }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <i class="fas fa-heart"></i>
        </q-item-section>
        <q-item-section side class="video">
          <q-avatar class="video-preview">
            <img :src="`${like.video_url}`" />
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
const likes = [{
  id: 1,
  name: 'Ruddy Jedrzej',
  date: '1574273808162',
  avatar: 'avatar1.jpg',
  video_url: '../preferences/animals.jpg'
}, {
  id: 2,
  name: 'Mallorie Zuck',
  date: '1574273790143',
  avatar: 'avatar2.jpg',
  video_url: '../preferences/animals.jpg'
}, {
  id: 3,
  name: 'Gorge Lebiskiy',
  date: '1574291790682',
  avatar: 'avatar4.jpg',
  video_url: '../preferences/fun.jpg'
}
]
export default {
  name: 'likes',
  data () {
    return {
      likes
    }
  },
  mounted () {
    likes.sort((a, b) => {
      return b.date - a.date
    })
  }
}
</script>
<style lang="scss" scoped>
.fa-heart {
  font-size: 1.2em;
  color: #e91e63;
}
</style>
