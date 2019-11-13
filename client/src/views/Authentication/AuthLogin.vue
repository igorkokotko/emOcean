<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-sm column fixed register" style="width: 300px">

      <q-input v-model="email" label="Email" :dense="dense" :rules="[val => checkEmailField(val)]"/>

      <q-input v-model.lazy="password" :type="isPwd1 ? 'password' : 'text'" label="Password" :dense="dense" :rules="[val => checkPasswordField(val)]">
        <template v-slot:append>
          <q-icon
            :name="isPwd1 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd1 = !isPwd1"
          />
        </template>
      </q-input>

      <q-btn color="white" text-color="black" @click="login" :disabled="!enableLogin">log in
        <q-spinner-bars
          color="primary"
          size="1em"
          v-show="loading"
        />
      </q-btn>

      <p style="margin-top:20px; margin-bottom:0"><a style='text-decoration: none' href='/forgotpassword'>Forgot password?</a></p>

      <p style="text-align: center; margin-top:20px">OR</p>

      <q-btn color="white" text-color="black" @click="handleClickSignIn">
        <img style="height: 1.5rem" src="../../assets/google-icon.png" />
        Sign In
      </q-btn>

      <p style="margin-top:20px">Don't have account yet? <a style='text-decoration: none' href='/register'>Register</a></p>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validateEmail, validatePassword } from '../../utilities/auth.js'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      dense: false,
      isPwd1: true,
      loading: false,
      emailField: false,
      passwordField: false
    }
  },
  methods: {
    checkEmailField: function (val) {
      if (validateEmail(val) && validateEmail(val).message === 'empty email') {
        this.emailField = false
        return 'Email field cannot be empty'
      } else if (validateEmail(val) && validateEmail(val).message === 'invalid email') {
        this.emailField = false
        return 'Your email is invalid'
      } else this.emailField = true
    },
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
    login: function () {
      this.loading = true
      axios
        .post('/api/auth/login', { password: this.password, email: this.email })
        .then(token => {
          // token to be added to Vuex
          console.log(token)
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    // Signs in, returns token
    handleClickSignIn () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          console.log('getAuthResponse', GoogleUser.getAuthResponse())
          axios.post('api/auth/loginwithgoogle', GoogleUser.getAuthResponse())
            .then(token => {
              // token to be added to Vuex
              console.log(token)
            })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    // enable "log in button" if all fields are filled
    enableLogin: function () {
      if (this.emailField && this.passwordField) return true
      else return false
    }
  }
}
</script>

<style scoped>
.register {
  right: 50vw;
  transform: translateX(50%);
  margin-top: 50px
}

.q-input {
  margin: -5px 0
}

.q-spinner {
  margin-left: 10px
}
</style>
