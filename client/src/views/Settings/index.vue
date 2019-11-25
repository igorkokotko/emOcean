<template>
  <div>
    <settings-menu></settings-menu>
  </div>
</template>

<script>
import SettingsMenu from './SettingsMenu.vue'

export default {
  name: 'SettingsPage',
  components: {
    SettingsMenu
  },
  beforeRouteEnter: (to, from, next) => {
    if (!window.localStorage.getItem('token') || window.localStorage.getItem('token') === '') {
      return next('/login')
    }
    next(vm => {
      vm.loadCurrentSettings(to.query)
    })
  }
}
</script>
