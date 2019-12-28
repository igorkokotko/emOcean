<template>
  <div class="header" @click="visible">
    <q-header bordered class="bg-white text-primary">
      <q-toolbar ref="toolbar">
        <div class="homeRouterLink" @click="navigate">
          <img src="@/assets/img/logoSmall.jpg" class="logo lt-sm" />
          <img src="@/assets/img/logo.jpeg" class="logo gt-xs" />
        </div>
        <q-space></q-space>
        <div
          id="input-search"
          ref="search"
          class="fixed-top-center"
          :style="{ visibility: 'hidden'}"
        >
          <q-input v-model="nickname" @input="searchByNick" @keyup.enter="searchTag" />
          <nickname-search
            v-if="showSearch"
            id="search-result"
            :results="nicknameSearchResults"
            @closeSearch="closeSearchComponent"
          />
        </div>
        <div ref="searchWrapper">
        <q-btn flat round dense icon="search" @click="visible" class="q-mr-xs text-cyan" />
        </div>
        <q-btn flat round dense icon="menu" class="text-cyan">
          <q-menu>
            <q-list style="min-width: 100px">
              <template v-if="isAuthenticated">
                <q-item to="/settings" clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable @click="logOut">
                  <q-item-section>Log out</q-item-section>
                </q-item>
              </template>
              <template v-else>
                <q-item to="/login" clickable>
                  <q-item-section>Login</q-item-section>
                </q-item>
                <q-item to="/register" clickable>
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
              this.nicknameSearchResults.push({
                id: element.profileId,
                nickname: element.nickname,
                avatar: element.avatar_url
              })
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
      if (this.userInput) {
        const hashRegex = /^#/
        const tagsQuery = this.userInput.split(' ').filter(item => hashRegex.test(item)
        ).map(item => item.replace(hashRegex, '')).join('-')
        if (tagsQuery) {
          if (this.$route.name === 'Feed') {
            if (
              this.$route.query.tab === 'search' &&
              this.$route.query.tags === tagsQuery
            ) {
              this.$router.replace({ query: { tab: 'search', tags: '' } })
            }
            this.$router.replace({ query: { tab: 'search', tags: tagsQuery } })
          } else {
            this.$router.push(`/?tab=search&tags=${tagsQuery}`)
          }
        }
      }
    },
    visible (e) {
      if (e.target === this.$refs.toolbar.$el) {
        this.$refs.search.style.visibility = 'hidden'
      } else if (e.target.textContent === this.$refs.searchWrapper.textContent) {
        this.$refs.search.style.visibility = 'visible'
      }
    },
    searchTag: function () {
      if (/^#/.test(this.userInput) && this.userInput !== '') {
        const tagsArray = this.userInput.split(' ').map(item => {
          if (item.startsWith('#')) { return item.trim().slice(1) }
        }).join('-')
        if (this.$route.name === 'Feed') {
          if (
            this.$route.query.tab === 'search' &&
            this.$route.query.tags === tagsArray
          ) {
            this.$router.replace({ query: { tab: 'search', tags: '' } })
          }
          this.$router.replace({ query: { tab: 'search', tags: tagsArray } })
        } else {
          this.$router.push(`/?tab=search&tags=${tagsArray}`)
        }
      }
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
      this.$router.push('/login')
    },
    navigate () {
      if (this.$route.path === '/') {
        if (this.$route.query.tab === 'search') {
          this.$router.replace({ query: { tab: 'popular' } })
        }
        this.$router.go()
      } else {
        this.$router.push('/')
      }
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
  cursor: pointer;
}

#input-search .q-field__control {
  height: 24px;
  position: relative;
}

#search-result {
  position: absolute;
}
</style>
