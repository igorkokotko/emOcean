<template>
  <div class="row login-container">
    <div class="offset-xs-12 offset-sm-2 col-sm-4 offset-md-3 col-md-3">Here should be logo and moto</div>
    <div class="offset-xs-1 col-xs-10 col-sm-4 col-md-3 column">

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

      <q-btn color='white' text-color='black' @click='login' :disabled='!enableLogin'>log in
        <q-spinner-bars
          class='q-ml-md'
          color='primary'
          size='1em'
          v-show='loading'
        />
      </q-btn>

      <p class='paragraph'><a href='/forgotpassword'>Forgot password?</a></p>

      <p id='center-paragraph'>OR</p>

      <q-btn color='white' text-color='black' @click="handleClickSignIn">
        <img id='google-img' src='../../assets/google-icon.png' />
        Sign In
      </q-btn>

      <p class='paragraph'>Don't have account yet? <a href='/register'>Register</a></p>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from '../../utilities/validationMixin.js'
import { notificationMixin } from '../../utilities/notificationMixin.js'

export default {
  mixins: [validationMixin, notificationMixin],
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
          this.$store.commit('login', { token: res.data.token, user: res.data.token })
          this.setAxiosHeaders(res.data.token)
          this.loading = false
          this.$router.push('/feed')
        })
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },
    setAxiosHeaders (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    handleClickSignIn () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          axios.post('api/auth/loginwithgoogle', GoogleUser.getAuthResponse())
            .then(res => {
              this.$store.commit('login', { token: res.data.token, user: res.data.token })
              this.setAxiosHeaders(res.data.token)
              this.loading = false
              this.$router.push('/feed')
            })
        })
        .catch(err => {
          if (err.error !== 'popup_closed_by_user') {
            this.error = err
          }
        })
    }
  },
  computed: {
    enableLogin () {
      return !!this.emailField && !!this.passwordField
    }
  },
  created: function () {
    if (this.$store.state.auth.notifyRegistered) {
      this.showNotif('You\'ve successfully created an account! Now log in.')
      this.$store.state.auth.notifyRegistered = false
    }
    if (this.$store.state.auth.notifyReset) {
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
