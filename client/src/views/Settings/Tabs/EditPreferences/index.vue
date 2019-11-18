<template>
  <div>
    <q-btn
      v-for="(preference, key) in preferences"
      :key="key"
      @click="updatePreference({key: key, updates: {chosen: !preference.chosen}})"
      size="50px"
      round
      class="q-ma-xs"
    >
      <q-avatar size="150px" >
        <img :src="preference.src">
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
    ...mapGetters('preferences', ['preferences'])

  }
}
</script>

<style scoped>
.chosen{
  background: #000;
  border: 2px solid;
}
</style>
