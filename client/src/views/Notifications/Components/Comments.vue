<template>
  <div>
    <q-list>
      <q-item v-for="comment in comments" :key="comment.id" class="q-my-sm" clickable>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <img :src="`https://cdn.quasar.dev/img/${comment.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <strong style="color:#333;">{{ comment.name }}</strong>
          </q-item-label>
          <q-item-label caption>
            <em>{{ comment.text }}</em>
          </q-item-label>
          <q-item-label caption>{{ $moment( parseInt(comment.date) ).fromNow() }}</q-item-label>
        </q-item-section>

        <q-item-section side class="video">
          <q-avatar square class="video-preview">
            <img :src="`${comment.post_url}`" />
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
const comments = [{
  id: 1,
  name: 'Ruddy Jedrzej',
  date: '1574273808162',
  text: 'Good photo',
  avatar: 'avatar1.jpg',
  post_url: '../preferences/animals.jpg'
}, {
  id: 2,
  name: 'Mallorie Zuck',
  date: '1574273790143',
  text: 'Really nice...',
  avatar: 'avatar2.jpg',
  post_url: '../preferences/animals.jpg'
}, {
  id: 3,
  name: 'George Lebiskiy',
  date: '1574273740192',
  text: 'It was really cool, I find two new friends.',
  avatar: 'avatar4.jpg',
  post_url: '../preferences/fun.jpg'
}, {
  id: 4,
  name: 'Dayana Fawdrey',
  date: '1574333011326',
  text: 'Happy birthday to you! Have a great time, with memories to last you throughout the whole year',
  avatar: 'avatar3.jpg',
  post_url: '../preferences/dance.jpg'
}]
export default {
  name: 'comments',
  data () {
    return {
      comments
    }
  },
  mounted () {
    comments.sort((a, b) => {
      return b.date - a.date
    })
  }
}
</script>
<style lang="scss" scoped>
.video-preview img {
  border: 2px solid #e91e63;
}
</style>
