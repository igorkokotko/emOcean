<template>
  <q-layout view="lHh Lpr lFf">
    <v-header />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import vHeader from '@/layouts/Header.vue'

export default {
  name: 'LayoutDefault',

  components: {
    vHeader
  },

  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>

<style>
</style>
