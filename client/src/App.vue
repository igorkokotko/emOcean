<template>
  <q-layout view="lHh Lpr lFf">
    <project-header />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import ProjectHeader from '@/layouts/Header.vue'

export default {
  name: 'LayoutDefault',

  components: {
    ProjectHeader
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
