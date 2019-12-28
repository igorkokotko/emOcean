<template>
  <q-layout view="lHh Lpr lFf">
    <v-header />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <Footer />
    <v-auth-banner v-if="showBanner" />
    <v-auth-login-modal :showLoginPage="showLoginPage" />
    <q-scroll-observer @scroll="onScroll" />
  </q-layout>
</template>

<script>
import Footer from './layouts/Footer.vue'
import vHeader from '@/layouts/Header.vue'
import { setApiAuthorizationHeaders } from '@/services/auth.js'
import { isAuthorized } from '@/views/Authentication/Authorized.js'
import AuthBanner from './views/Authentication/AuthBanner.vue'
import AuthModal from './views/Authentication/AuthModal.vue'
import { authModalMixin } from './utilities/authModalMixin.js'

export default {
  name: 'LayoutDefault',
  mixins: [authModalMixin],
  components: {
    Footer,
    vHeader,
    'v-auth-banner': AuthBanner,
    'v-auth-login-modal': AuthModal
  },

  data () {
    return {
      showBanner: true,
      fromRoute: null
    }
  },

  created () {
    if (isAuthorized()) {
      const token = window.localStorage.getItem('token')
      this.$store.commit('auth/signin', { token })
      setApiAuthorizationHeaders(token)
    }

    if (window.localStorage.getItem('profileId') && window.localStorage.getItem('profileId') !== '') {
      const profileId = window.localStorage.getItem('profileId')
      this.$store.commit('profile/updateMyProfileId', profileId)
    }
  },
  updated () {
    if (isAuthorized()) {
      this.showBanner = false
    } else {
      this.showBanner = true
    }
  }
}
</script>

<style lang="scss">
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
}
h1,
h2,
h3,
h4 {
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

.follow-item {
  .q-item__section {
    .follow-avatar {
      @media only screen and (min-width: 768px) {
        font-size: 70px;
      }
    }
    .follow-btn {
      .profile-card-button {
        @media only screen and (max-width: 767px) {
          min-width: 80px;
          padding: 2px 15px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
