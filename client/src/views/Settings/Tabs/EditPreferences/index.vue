<template>
  <div class="row justify-around">
    <q-btn
      v-for="(preference, key) in getPreferences"
      :key="key"
      @click="updatePreference({key: key, updates: {chosen: !preference.chosen}})"
      size="40px"
      round
      class="q-ma-xs"
    >
      <q-avatar size="120px">
        <img :src="preference.src" :class ="{chosen: preference.chosen}"/>
          <div :class="[preference.chosen ? 'chosen' : 'img-caption',
            'absolute-center',
            'text-subtitle1',
            'text-center']"
          >
          {{preference.hashtag | sliceHash}}
          </div>
      </q-avatar>
    </q-btn>
    <q-btn
      size="40px"
      round
      color="teal"
      @click="savePreferences(getPreferences)"

    > go
    </q-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'EditPreferences',
  data: function () {
    return {
      tags: []
    }
  },
  methods: {
    ...mapActions('preferences', ['updatePreference', 'rollbackChanges']),
    getChosenTags: function (state) {
      for (let obj in state) {
        if (state[obj].chosen) {
          this.tags.push(state[obj].hashtag)
        }
      }
    },

    savePreferences: function (state) {
      this.getChosenTags(state)
      axios.post('/api/preferences/save', this.tags)
        .then((response) => {
          console.log(response)
          alert('data saved')
        })
        .catch(error => {
          this.rollbackChanges(this.tags)
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log(error.requset)
          } else {
            console.log('Error', error.message)
          }
          alert('Oooops, something went wrong!')
        })
    }
  },
  computed: {
    ...mapGetters('preferences', ['getPreferences'])
  },
  filters: {
    sliceHash: function (value) {
      return value.slice(1)
    }
  }
}
</script>

<style scoped>
.chosen {
  background-color: rgba(2, 211, 176, 0.801);
  color: #000;
  width: 90%;
  height: 20%;
  align-self: center;
  border-radius: 0 40px 0 40px;
  }

img.chosen {
  filter: grayscale(100%);
}

.img-caption {
  background-color: rgba(39, 39, 39, 0.602);
  color: #fff;
  width: 90%;
  height: 20%;
  align-self: center;
  border-radius: 0 40px 0 40px
}

</style>
