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
            <q-item-section avatar @click="$router.push({ path: `/profile/${like.profile_id}` })">
              <q-avatar color="primary" text-color="white">
                <img :src="like.avatar_url" />
              </q-avatar>
            </q-item-section>

            <q-item-section @click="$router.push({ path: `/profile/${like.profile_id}` })">
              <q-item-label>{{ like.nickname }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                class="follow-btn"
                v-if="!like.followed"
                @click="follow(like)"
                unelevated
                rounded
                size="sm"
                label="Follow"
              />
              <q-btn
                class="unfollow-btn"
                v-if="like.followed"
                @click="unfollow(like)"
                unelevated
                outline
                rounded
                size="sm"
                label="Unfollow"
              />
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
  created () {
    console.log("Created")
    console.log(this.info)
    this.getLikedList('0kCAVkl8noht4sDbOf60')
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
    ...mapActions(['getLikedList', 'updateList']),
    follow: (follower) => {
      console.log('follow')
      follower.followed = true
    },
    unfollow: (follower) => {
      console.log('unfollow')
      follower.followed = false
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
.follow-btn {
  background: #4db6ac;
  color: #fff;
}
.unfollow-btn {
  color: #333;
  border-color: #13c4c4;
}
</style>
