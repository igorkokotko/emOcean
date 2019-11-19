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
      <q-avatar size="150px" >
        <img :src="preference.src" :class ="{chosen: preference.chosen}">
      </q-avatar>
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
.chosen{
  border: 10px solid  rgba(90, 251, 224, 0.171);
  filter: blur(0px);
}
</style>
