<template>
    <div :class="loginClassList">

      <q-input v-model.lazy="email" label="Email" :dense="dense" :rules="[val => checkEmailField(val)]"/>

      <q-input v-model.lazy="password" :type="isPwd1 ? 'password' : 'text'" label="Password" :dense="dense" :rules="[val => checkPasswordField(val)]">
        <template v-slot:append>
          <q-icon
            :name="isPwd1 ? 'visibility_off' : 'visibility'"
            class='cursor-pointer'
            @click='isPwd1 = !isPwd1'
          />
        </template>
      </q-input>

      <p id='error-message'>{{ error }}</p>

      <q-btn color='white' text-color='black' @click='login' class='full-width' :disabled='!enableLogin'>log in
        <q-spinner-bars
          class='q-ml-md'
          color='primary'
          size='1em'
          v-show='loading'
        />
      </q-btn>

      <p class='paragraph'><a href='/forgotpassword'>Forgot password?</a></p>

      <p id='center-paragraph'>OR</p>

      <q-btn color='white' text-color='black' @click="handleClickSignIn" class='full-width'>
        <img id='google-img' src='../../assets/google-icon.png' />
        Sign In
      </q-btn>

      <p class='paragraph'>Don't have account yet? <a href='/register'>Register</a></p>

    </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from '../../utilities/validationMixin.js'
import { notificationMixin } from '../../utilities/notificationMixin.js'
var ApiService = require('../../utilities/ApiService.js')

export default {
  mixins: [validationMixin, notificationMixin],
  props: ['loginClassList'],
  data () {
    return {
      email: '',
      password: '',
      dense: false,
      isPwd1: true,
      loading: false,
      emailField: false,
      passwordField: false,
      error: ''
    }
  },
  methods: {
    login () {
      this.loading = true
      const { email, password } = this
      axios
        .post('api/auth/login', { password, email })
        .then(res => {
          this.$store.commit('login', { token: res.data.token, user: res.data.user })
          ApiService.setApiAuthorizationHeaders(res.data.token)
          window.localStorage.setItem('token', res.data.token)
          this.loading = false
          this.$router.push('/feed')
        })
        .catch(err => {
          this.error = err.response ? err.response.data.error : 'Sorry. Something has gone wrong...'
          this.loading = false
        })
    },
    handleClickSignIn () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          axios.post('api/auth/login-with-google', GoogleUser.getAuthResponse())
            .then(res => {
              this.$store.commit('login', { token: res.data.token, user: res.data.token })
              ApiService.setApiAuthorizationHeaders(res.data.token)
              window.localStorage.setItem('token', res.data.token)
              this.loading = false
              this.$router.push('/feed')
            })
        })
        .catch(err => {
          if (err.error !== 'popup_closed_by_user') {
            this.error = err.response ? err.response.data.error : 'Sorry. Something has gone wrong...'
          }
        })
    }
  },
  computed: {
    enableLogin () {
      return !!this.emailField && !!this.passwordField
    },
    notifyRegistered () {
      return this.$store.getters.notifyRegistered
    },
    notifyReset () {
      return this.$store.getters.notifyReset
    }
  },
  created: function () {
    if (this.notifyRegistered) {
      this.showNotif('You\'ve successfully created an account! Now log in.')
      this.$store.state.auth.notifyRegistered = false
    }
    if (this.notifyReset) {
      this.showNotif('Your password was successfully reset. Now log in.')
      this.$store.state.auth.notifyReset = false
    }
  }
}
</script>

<style scoped>
.login-container {
  overflow: auto;
  margin-top: 50px;
}

#error-message {
  color: #C10015;
}

#google-img {
  height: 1.5rem;
}

#center-paragraph {
  text-align: center;
  margin-top: 20px;
}

.paragraph {
  margin-top: 20px;
  margin-bottom: 0;
}

a {
  text-decoration: none;
}
</style>
