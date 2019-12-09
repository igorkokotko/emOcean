<template>
<div>
  <q-virtual-scroll
    class="virtual-scroll"
    :items="results"
  >
    <template v-slot="{ item: user, index }">
      <q-item
        :key="index"
        dense
        clickable
        v-if="!results[0].error"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.avatar" class='avatar-image'>
          </q-avatar>
        </q-item-section>
        <!-- change after deployment !!! -->
        <a :href="'http://localhost:8080/profile/' + user.id" class='row'>
        <q-item-section class="col">{{ user.nickname }}</q-item-section>
        </a>
      </q-item>
      <q-item v-else>
        <q-item-section>
          <p>{{ results[0].error }}</p>
        </q-item-section>
      </q-item>
    </template>
  </q-virtual-scroll>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['results']
}
</script>

<style scoped>
  * {
    background-color: white;
  }

  .avatar-image {
    object-fit: cover;
  }

  .virtual-scroll {
    max-height: 300px;
    border: 1px solid #e0e1e1;
  }
</style>
