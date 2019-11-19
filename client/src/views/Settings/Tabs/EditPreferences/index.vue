<template>
  <div>
    <q-btn
      v-for="(preference, key) in getPreferences"
      :key="key"
      @click="updatePreference({key: key, updates: {chosen: !preference.chosen}})"
      size="50px"
      round
      class="q-ma-xs"
    >
      <q-avatar size="150px">
        <img :src="preference.src" :class ="{chosen: preference.chosen}"/>
          <div v-bind:class="[preference.chosen ? 'chosen' : 'img-caption',
            'absolute-center',
            'text-h6',
            'text-center']"
          >
          {{preference.title}}
          </div>
      </q-avatar>
    </q-btn>
    <q-btn
      size="50px"
      round
      color="teal"
      icon="video_library"
    >
    </q-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditPreferences',
  methods: {
    ...mapActions('preferences', ['updatePreference'])
  },
  computed: {
    ...mapGetters('preferences', ['getPreferences'])
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
  /* filter: blur(2px); */
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
