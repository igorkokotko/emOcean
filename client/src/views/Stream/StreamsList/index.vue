<template>
  <q-list class="streams-list">
    <q-item-label header class="row justify-between">
      <h6 class="title">Streams</h6>
      <q-btn
        v-show="isAuthorized"
        class="start-stream-btn"
        label="Start stream"
        rounded
        @click="prompt = true"
      />
      <q-dialog v-model="prompt" persistent>
        <stream-form />
      </q-dialog>
    </q-item-label>
    <q-item
      v-for="stream in streams"
      :key="stream.id"
      class="q-my-sm"
      clickable
      @click="goToViewerPage(stream.id)"
    >
      <q-item-section
        avatar
        @click="goToAuthorProfile(stream.author.nickname)"
      >
        <avatar
          :img="stream.author.avatarUrl"
          size="50px"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ stream.title  }}</q-item-label>
        <q-item-label caption lines="1">{{ stream.author.nickname }}</q-item-label>
      </q-item-section>
      <q-item-section side top>
        {{ getStreamStartTime(stream) }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import StreamForm from './StreamForm.vue'
import { getStreamsList } from '@/services/streams.js'

export default {
  components: {
    Avatar,
    StreamForm
  },

  data () {
    return {
      prompt: false,
      streams: []
    }
  },

  computed: {
    isAuthorized () {
      return this.$store.getters['auth/getToken'].length !== 0
    }
  },

  methods: {
    goToAuthorProfile (nickname) {
      this.$router.push({ path: `/profile/${nickname}` })
    },

    goToViewerPage (id) {
      this.$router.push({ path: `/streams/${id}/viewer` })
    },

    getStreamStartTime (stream) {
      const date = new Date(stream.startTime.seconds * 1000)
      return `${date.getHours()}:${date.getMinutes()}`
    }
  },

  created () {
    getStreamsList()
      .then((res) => {
        this.streams = res.data
      })
  }
}
</script>

<style scoped>
.streams-list {
  background-color: #fff !important;
}

.start-stream-btn {
  background: #4db6ac;
  color: #fff;
}

.title {
  color: #4db6ac;
}
</style>
