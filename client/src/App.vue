<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
      </q-toolbar>
    </q-header> -->
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
