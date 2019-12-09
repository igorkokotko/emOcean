<template>
  <div>
    <q-dialog v-model="info.show" position="bottom">
      <q-card>
        <q-bar class="dialog-header text-white">
          <div class="text-h6">Likes</div>
          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-list>
          <q-item v-for="like in likes" :key="like.id" class="q-my-sm" clickable>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <img :src="`https://cdn.quasar.dev/img/${like.avatar}`" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ like.name }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>{{ like.date | howMatchTimeAgo}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <i class="fas fa-heart"></i>
            </q-item-section>
          </q-item>
        </q-list>

        <q-card-actions>
          <q-btn label="CLOSE LIST" style="background:#4db6ac;" color="#fff" class="full-width" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const likes = [{
  id: 1,
  name: 'Ruddy Jedrzej',
  date: '1570062998222',
  avatar: 'avatar1.jpg'
}, {
  id: 2,
  name: 'Jan Khalib',
  date: '1572273790143',
  avatar: 'avatar2.jpg'
}, {
  id: 3,
  name: 'Gorge Lebiskiy',
  date: '1574291790682',
  avatar: 'avatar4.jpg'
}, {
  id: 4,
  name: 'Dayana Fawdrey',
  date: '1574073740192',
  avatar: 'avatar3.jpg'
}, {
  id: 5,
  name: 'Mallorie Zuck',
  date: '1574291846223',
  avatar: 'avatar2.jpg'
}, {
  id: 6,
  name: 'Mallorie Zuck',
  date: '1575762998222',
  avatar: 'avatar2.jpg'
}, {
  id: 7,
  name: 'Gorge Lebiskiy',
  date: '1575062998222',
  avatar: 'avatar4.jpg'
}
]
export default {
  props: ["info"],
  data () {
    return {
      likes
    }
  },
  methods: {
  },
  mounted () {
    likes.sort((a, b) => {
      return b.date - a.date
    })
  },
  filters: {
    howMatchTimeAgo: function (date) {
      if (!date) return ''
      let time = Date.now() - date
      time = Math.floor(time / 1000)
      if (time < 60) return `${time} sec ago`
      time = Math.floor(time / 60)
      if (time < 60) return `${time} min ago`
      time = Math.floor(time / 60)
      if (time < 24) return `${time} hour ago`
      time = Math.floor(time / 24)
      if (time < 7) return `${time} days ago`
      time = Math.floor(time / 7)
      if (time < 4) return `${time} weeks ago`
      time = Date.now() - date
      time = Math.floor(time / 1000 / 60 / 60 / 24 / 30.5)
      if (time < 12) return `${time} mounth ago`
      else return `A lot of time ago`
    }
  }
}
</script>
<style lang="scss" scoped>
.q-bar {
  background: #4db6ac;
}
.fa-heart {
  font-size: 1.2em;
  color: #e91e63;
}
</style>
