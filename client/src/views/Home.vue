<template>
  <div class="home">
    <v-auth-login-modal :showLoginPage="showLoginPage" />
    <q-scroll-observer @scroll="onScroll" />
  </div>
</template>

<script>
import AuthModal from './Authentication/AuthModal.vue'
import { authModalMixin } from '../utilities/authModalMixin.js'

export default {
  mixins: [authModalMixin],
  name: 'home',
  components: {
    'v-auth-login-modal': AuthModal
  },
  beforeRouteEnter: (to, from, next) => {
    if (to.path === '/') {
      return next('/feed')
    }
    next()
  },
  beforeRouteUpdate: (to, from, next) => {
    if (to.path === '/') {
      return next('/feed')
    }
    next()
  }
}
</script>

<style>
</style>
