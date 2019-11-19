<template>
  <q-layout view="lHh Lpr lFf">
    <v-header />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <Footer/>
  </q-layout>
</template>

<script>
import Footer from './layouts/Footer.vue'
import vHeader from '@/layouts/Header.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Footer,
    vHeader
  },

  data () {
    return {
    }
  }
}
</script>

<style>
</style>
