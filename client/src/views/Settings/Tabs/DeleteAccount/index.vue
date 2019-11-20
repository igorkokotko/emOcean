<template>
  <div>
    <p class="danger text-h5">ATTENTION!!!</p>
    <p>This action will delete our account</p>
    <q-btn label="Confirm" color="pink" @click="confirm = true" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="pink" text-color="white" />
          <span class="q-ml-sm">Do you really want to delete your account?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="teal" v-close-popup />
          <q-btn flat label="Delete" color="pink" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeleteAccount',
  data () {
    return {
      confirm: false
    }
  }
}
</script>

<style scoped>
.danger {
  color: #e91e63;
}
</style>
