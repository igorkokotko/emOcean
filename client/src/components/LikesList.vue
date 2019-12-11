<template>
  <div>
    <q-dialog v-model="info.show" :position="position">
      <q-card>
        <q-bar class="dialog-header text-white">
          <div class="text-h6">Likes</div>
          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-list>
          <q-item v-for="like in getLikes" :key="like.id" class="q-my-sm" clickable>
            <q-item-section avatar @click="$router.push({ path: `/profile/${like.user_id}` })">
              <q-avatar color="primary" text-color="white">
                <img :src="`https://cdn.quasar.dev/img/${like.avatar}`" />
              </q-avatar>
            </q-item-section>

            <q-item-section @click="$router.push({ path: `/profile/${like.user_id}` })">
              <q-item-label>{{ like.name }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>{{ $moment( parseInt(like.date) ).fromNow() }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <i class="fas fa-heart"></i>
            </q-item-section>
          </q-item>
        </q-list>

        <q-card-actions>
          <q-btn
            label="CLOSE LIST"
            style="background:#4db6ac;"
            color="#fff"
            class="full-width"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ["info"],
  data () {
    return {
      position: (document.body.offsetWidth < 700) ? 'bottom' : 'right'
    }
  },
  computed: {
    ...mapGetters(['getLikes'])
  },
  watch: {
    info: {
      handler: (previous) => {
        console.log(previous)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['getLikedList', 'updateList'])
  },
  created () {
    console.log("Created")
    this.updateList()
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
