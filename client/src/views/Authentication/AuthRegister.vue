<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-sm column fixed register" style="width: 300px">

      <q-input v-model="email" label="Email" :dense="dense" :rules="[val => checkEmailField(val)]"/>

      <q-input v-model="nickname" label="Nickname" :dense="dense" :rules="[val => checkNicknameField(val)]"/>

      <q-input v-model.lazy="password" :type="isPwd1 ? 'password' : 'text'" label="Password" :dense="dense" :rules="[val => checkPasswordField(val)]">
        <template v-slot:append>
          <q-icon
            :name="isPwd1 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd1 = !isPwd1"
          />
        </template>
      </q-input>

      <q-input v-model.lazy="passwordConfirm" :type="isPwd2 ? 'password' : 'text'" label="Repeat Password" :dense="dense" :rules="[val => checkRepeatPasswordField(val)]">
        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd2 = !isPwd2"
          />
        </template>
      </q-input>

      <p style="color: #C10015">{{ error }}</p>

      <q-btn color="white" text-color="black" @click='register' :disabled='!enableCreate'>create account
        <q-spinner-bars
          color="primary"
          size="1em"
          v-show="loading"
        />
      </q-btn>

      <p style="text-align: center; margin-top:20px">OR</p>

      <q-btn color="white" text-color="black" @click="handleClickSignIn">
        <img style="height: 1.5rem" src="../../assets/google-icon.png" />
        Sign In
      </q-btn>

      <p style="margin-top:20px">Already have an account? <a style='text-decoration: none' href='/login'>Log In</a></p>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validateEmail, validatePassword, validateNickname } from '../../utilities/auth.js'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      dense: false,
      isPwd1: true,
      isPwd2: true,
      loading: false,
      emailField: false,
      nicknameField: false,
      passwordField: false,
      error: ''
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
    checkNicknameField: function (val) {
      if (validateNickname(val) && validateNickname(val).message === 'empty nickname') {
        this.nicknameField = false
        return 'Nickname field cannot be empty'
      } else if (validateNickname(val) && validateNickname(val).message === 'wrong length') {
        this.nicknameField = false
        return 'Your nickname should contain 4 to 20 characters'
      } else if (validateNickname(val) && validateNickname(val).message === 'space') {
        this.nicknameField = false
        return 'Your nickname should not contain whitespaces'
      } else this.nicknameField = true
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
    checkRepeatPasswordField: function (val) {
      if (this.password !== this.passwordConfirm) {
        return 'Your passwords do not match'
      }
    },
    register: function () {
      this.loading = true
      axios
        .post('/api/auth/register', { email: this.email, password: this.password, nickname: this.nickname })
        .then(res => {
          if (res.message === 'User created') {
            this.$router.go('/auth/login')
          }
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
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    // enable "log in button" if all fields are filled
    enableCreate: function () {
      if (this.emailField && this.nicknameField && this.passwordField && this.password === this.passwordConfirm) return true
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
