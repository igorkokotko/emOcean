<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-sm column fixed register" style="width: 300px" v-if="reset">
      <p style="text-align: center; margin-top:20px; margin-bottom: 0">Create New Password</p>

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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validatePassword } from '../../utilities/auth.js'

export default {
  name: 'register',
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
      oobCode: ''
    }
  },

  methods: {
    checkPasswordField: function (val) {
      if (validatePassword(val) && validatePassword(val).message === 'empty password') {
        this.passwordField = false
        return 'Password field cannot be empty'
      } else if (validatePassword(val) && validatePassword(val).message === 'wrong length') {
        this.passwordField = false
        return 'Your password should contain 8 to 20 characters'
      } else if (validatePassword(val) && validatePassword(val).message === 'wrong content') {
        this.passwordField = false
        return 'At least one uppercase, one lowercase character required, no whitespace allowed'
      } else this.passwordField = true
    },
    checkRepeatPasswordField: function (val) {
      if (this.password !== this.passwordConfirm) {
        return 'Your passwords do not match'
      }
    },
    resetPass: function (e) {
      this.loading = true
      axios
        .post('/api/auth/resetpassword', { password: this.password, oobCode: this.oobCode })
        .then(res => {
          console.log(res.data)
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    }
  },

  computed: {
    // enable "create button" if all fields are filled
    enableCreate: function () {
      if (this.passwordField && this.password === this.passwordConfirm) return true
      else return false
    }
  },

  created: function () {
    if (this.$route.query.mode === 'resetPassword') {
      this.reset = true
      this.oobCode = this.$route.query.oobCode
    } else this.reset = false
    // resetPassword
  }
}
</script>

<style scoped>
.register {
  right: 50vw;
  transform: translateX(50%);
  margin-top: 50px
}

.q-spinner {
  margin-left: 10px
}
</style>
