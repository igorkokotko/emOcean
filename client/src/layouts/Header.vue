<template>
  <q-header
    bordered
    class="bg-white text-primary"
  >
    <q-toolbar>
      <router-link :to="{path: '/'}">
        <img
          src="@/assets/img/logo.jpeg"
          class="q-ma-sm logo"
        >
      </router-link>
      <q-space ></q-space>
      <q-btn
        flat
        round
        dense
        icon="search"
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
</template>

<style scoped>
  .logo {
    height: 50px;
  }
</style>
