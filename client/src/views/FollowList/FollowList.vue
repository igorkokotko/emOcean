<template>
  <q-list class="follow-list">
    <div
      v-for="item in followList"
      :key="item.id"
      class="q-my-sm"
      clickable
    >
        <follow-item :item="item"></follow-item>
    </div>
  </q-list>
</template>

<script>
import FollowItem from './FollowItem'
export default {
  components: {
    FollowItem
  },
  props: {
    followList: Array
  }
}
</script>

<style>
</style>
