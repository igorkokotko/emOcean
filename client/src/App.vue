<template>
  <q-layout view="lHh Lpr lFf">
    <v-header />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <Footer/>
    <v-auth-banner />
  </q-layout>
</template>

<script>
import Footer from './layouts/Footer.vue'
import vHeader from '@/layouts/Header.vue'
import ApiService from '@/utilities/ApiService.js'
import AuthBanner from './views/Authentication/AuthBanner.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Footer,
    vHeader,
    'v-auth-banner': AuthBanner
  },

  data () {
    return {
    }
  },

  created () {
    if (window.localStorage.getItem('token') && window.localStorage.getItem('token') !== '') {
      const token = window.localStorage.getItem('token')
      this.$store.commit('auth/signin', { token })
      ApiService.setApiAuthorizationHeaders(token)
    }

    if (window.localStorage.getItem('profileId') && window.localStorage.getItem('profileId') !== '') {
      const profileId = window.localStorage.getItem('profileId')
      this.$store.commit('profile/updateMyProfileId', profileId)
    }
  }
}
</script>

<style>
  /*reset*/
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  background-color: white;
}
h1, h2, h3, h4 {
  line-height: normal;
  margin: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
li {
  list-style: none;
}
</style>
