<template>
  <q-avatar
    :size="size"
    :font-size="size"
    color="primary"
    text-color="white"
    :icon="img.length === 0 ? 'account_circle' : null"
  >
    <img v-if="img.length > 0" :src="img">
  </q-avatar>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '100px'
    }
  }
}
</script>
