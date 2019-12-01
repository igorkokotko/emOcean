<template>
  <div>
    <settings-menu></settings-menu>
  </div>
</template>

<script>
import SettingsMenu from './SettingsMenu.vue'
const Authorized = require('../Authentication/Authorized.js')

export default {
  name: 'SettingsPage',
  components: {
    SettingsMenu
  },
  beforeRouteEnter: (to, from, next) => {
    if (!Authorized.isAuthorized()) {
      return next('/login')
    }
    next(vm => {
      vm.loadCurrentSettings(to.query)
    })
  }
}
</script>
