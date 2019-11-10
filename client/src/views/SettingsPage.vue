<template>
  <div>
    <p>This is settings page!</p>
    <settings-menu></settings-menu>
  </div>
</template>

<script>
import SettingsMenu from '@/components/SettingsPage/SettingsMenu.vue'

export default {
  name: 'SettingsPage',
  components: {
    SettingsMenu
  }
}
</script>

<style>
p {
  color: red;
}
</style>
