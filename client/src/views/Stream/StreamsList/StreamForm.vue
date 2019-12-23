<template>
  <q-card class="q-card">
    <q-card-section class="row items-center">
      <div class="text-h6">
        Title of stream
      </div>
      <q-space />
      <q-btn
        icon="close"
        flat
        round
        dense
        v-close-popup
      />
    </q-card-section>

    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          dense
          v-model="formModel.title"
          autofocus
        />
        <div>
          <q-btn
            label="Submit"
            type="submit"
            color="secondary"
            rounded
          />
          <q-btn
            label="Reset"
            type="reset"
            color="secondary"
            rounded
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { createStream } from '@/services/streams.js'

export default {
  data () {
    return {
      formModel: {
        title: ''
      }
    }
  },

  methods: {
    onSubmit () {
      createStream(this.formModel)
        .then((res) => {
          this.$router.push({ path: `/streams/${res.id}/presenter` })
        })
    },

    onReset () {
      this.formModel = { title: '' }
    }
  }
}
</script>

<style scoped>
.q-card {
  min-width: 350px;
}
</style>
