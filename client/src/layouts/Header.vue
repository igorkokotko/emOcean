<template>
  <div class='header' @click='hideSearch'>
    <q-header
      bordered
      class="bg-white text-primary"
    >
      <q-toolbar>
        <router-link
          :to="{path: '/'}"
          class="homeRouterLink"
        >
          <img
            src="@/assets/img/logo.jpeg"
            class="logo"
          >
        </router-link>
        <q-space ></q-space>
        <div id='input-search' ref='search' :style='{ visibility: "hidden"}'>
          <q-input
            ref='input'
            v-model='search'
            />
          </div>
        <q-btn
          flat
          round
          dense
          icon="search"
          @click='showSearch'
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
              <template v-if="$store.state.auth.token">
                <q-item
                  to="/settings"
                  clickable
                >
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section disabled>Log out</q-item-section>
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
export default {
  name: 'Header',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    showSearch () {
      this.$refs.search.style.visibility = 'visible'
    },
    hideSearch (e) {
      if (e.target.className === 'q-toolbar row no-wrap items-center') {
        this.$refs.search.style.visibility = 'hidden'
      }
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
  }
</style>
