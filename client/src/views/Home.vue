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
  }
}
</script>

<style>
</style>
