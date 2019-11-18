<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <Footer/>
  </q-layout>
</template>

<script>
import Footer from './layouts/Footer.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Footer
  },

  data () {
    return {
    }
  }
}
</script>

<style>
</style>
