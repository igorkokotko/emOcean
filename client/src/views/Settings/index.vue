<template>
  <div>
    <p>This is settings page!</p>
    <settings-menu style="red" class="red" />
    <router-view />
  </div>
</template>

<script>
import SettingsMenu from './SettingsMenu.vue'

export default {
  name: 'SettingsPage',
  components: {
    SettingsMenu
  }
}
</script>
