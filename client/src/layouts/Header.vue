<template>
  <div class="header" @click="visible">
    <q-header
      bordered
      class="bg-white text-primary"
    >
      <q-toolbar ref="toolbar">
        <router-link
          :to="{path: '/'}"
          class="homeRouterLink"
        >
          <img
            src="@/assets/img/logoSmall.jpg"
            class="logo lt-sm"
          >
          <img
            src="@/assets/img/logo.jpeg"
            class="logo gt-xs"
          >
        </router-link>
        <q-space ></q-space>
        <div id="input-search" ref="search" class="fixed-top-center" :style="{ visibility: 'hidden'}">
          <q-input v-model='userInput' @input="searchByNick" @keyup.enter="searchTag"/>
          <nickname-search v-if="showSearch" id="search-result" :results="nicknameSearchResults" @closeSearch="closeSearchComponent"/>
        </div>
        <q-btn
          flat
          round
          dense
          icon="search"
          @click="visible"
          class="q-mr-xs text-cyan" />
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="text-cyan"
        >
          <q-menu>
            <q-list style="min-width: 100px">
              <template v-if="isAuthenticated">
                <q-item
                  to="/settings"
                  clickable
                >
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item
                  clickable
                  @click="logOut"
                >
                  <q-item-section>Log out</q-item-section>
                </q-item>
              </template>
              <template v-else>
                <q-item
                  to="/login"
                  clickable
                >
                  <q-item-section>Login</q-item-section>
                </q-item>
                <q-item
                  to="/register"
                  clickable
                >
                  <q-item-section>Register</q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
import NicknameSearch from '../components/NicknameSearch.vue'
import debounce from 'lodash/debounce'
import { searchByNick } from '@/services/profile.js'
import { searchByTag } from '@/services/post.js'

export default {
  name: 'Header',
  components: {
    NicknameSearch
  },
  data () {
    return {
      userInput: '',
      showSearch: true,
      nicknameSearchResults: []
    }
  },

  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/getToken']
    }
  },

  methods: {
    searchByNick: debounce(function (value) {
      if (!/^#/.test(value) && value !== '') {
        this.nicknameSearchResults = []
        this.showSearch = true
        searchByNick({ nickname: value })
          .then(res => {
            this.nicknameSearchResults = []
            res.data.message.forEach(element => {
              this.nicknameSearchResults.push({ id: element.profileId, nickname: element.nickname, avatar: element.avatar_url })
            })
          })
          .catch(err => {
            if (err.response.data.error === 'No user has been found') {
              this.nicknameSearchResults = []
              this.nicknameSearchResults.push({ error: 'No matches found' })
            }
          })
      } else {
        this.showSearch = false
        this.nicknameSearchResults = []
      }
    }, 300),

    searchTag: function () {
      console.log('enter')
      console.log(this.userInput)
      if (/^#/.test(this.userInput) && this.userInput !== '') {
        let inputValue = this.userInput.trim().slice(1)
        searchByTag(inputValue)
          .then(res => {
            console.log(res.data.message)
          })
          .catch(err => {
            console.log(err.message)
          })
      }
    },
    visible (e) {
      if (e.target === this.$refs.toolbar.$el) {
        this.$refs.search.style.visibility = 'hidden'
      } else this.$refs.search.style.visibility = 'visible'
    },

    logOut () {
      this.$store.dispatch('auth/signin', { token: '', user: '' })
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('profileId')
      this.$q.notify({
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        timeout: 3000,
        color: 'primary',
        message: 'You logged out.'
      })
      this.$router.push('/feed')
    },

    closeSearchComponent () {
      this.showSearch = false
      this.nickname = ''
    }
  }
}
</script>

<style>
  .logo {
    height: 100%;
    margin: 0;
  }
  .homeRouterLink {
    height: 60px;
    display: block;
    padding: 8px 0;
  }

  #input-search .q-field__control {
    height: 24px;
    position: relative;
  }

  #search-result {
    position: absolute;
  }
</style>
