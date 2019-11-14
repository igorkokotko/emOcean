<template>
  <div style="overflow:auto">
    <div class="row register-container">
      <div class="gt-xs offset-sm-2 col-sm-4 offset-md-3 col-md-3">Here should be logo and moto</div>
      <div class="offset-xs-1 col-xs-10 col-sm-4 col-md-3 column" v-if="reset">
        <q-input v-model.lazy="password" :type="isPwd1 ? 'password' : 'text'" label="Password" :dense="dense" :rules="[val => checkPasswordField(val)]">
          <template v-slot:append>
            <q-icon
              :name="isPwd1 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd1 = !isPwd1"
            />
          </template>
        </q-input>

        <q-input v-model.lazy="passwordConfirm" :type="isPwd2 ? 'password' : 'text'" label="Confirm Password" :dense="dense" :rules="[val => checkRepeatPasswordField(val)]">
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </q-input>

        <q-btn color="white" text-color="black" @click="resetPass" :disabled="!enableCreate">Set password
          <q-spinner-bars
            color="primary"
            size="1em"
            v-show="loading"
          />
        </q-btn>

        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from '../../utilities/validationMixin.js'

export default {
  mixins: [validationMixin],
  data () {
    return {
      password: '',
      passwordConfirm: '',
      dense: false,
      isPwd1: true,
      isPwd2: true,
      loading: false,
      reset: false,
      passwordField: false,
      oobCode: '',
      message: ''
    }
  },

  methods: {
    resetPass () {
      this.loading = true
      axios
        .post('/api/auth/resetpassword', { password: this.password, oobCode: this.oobCode })
        .then(res => {
          this.loading = false
          this.$router.go('/auth/login')
        })
        .catch(err => {
          this.message = err
          this.loading = false
        })
    }
  },

  computed: {
    // enable "create button" if all fields are filled
    enableCreate () {
      return !!this.passwordField && this.password === this.passwordConfirm
    }
  },

  created: function () {
    if (this.$route.query.mode === 'resetPassword') {
      this.reset = true
      this.oobCode = this.$route.query.oobCode
    } else {
      this.reset = false
    }
    // resetPassword
  }
}
</script>

<style scoped>
.register-container {
  margin-top: 50px
}

.q-spinner {
  margin-left: 10px
}
</style>
