<template>
  <div class="row register-container">
    <div class="offset-xs-12 offset-sm-2 col-sm-4 offset-md-3 col-md-3">Here should be logo and moto</div>
    <div class="offset-xs-1 col-xs-10 col-sm-4 col-md-3 column">

      <q-input v-model.lazy="email" label="Email" :dense="dense" :rules="[val => checkEmailField(val)]"/>

      <q-input v-model.lazy="password" :type="isPwd1 ? 'password' : 'text'" label="Password" :dense="dense" :rules="[val => checkPasswordField(val)]">
        <template v-slot:append>
          <q-icon
            :name="isPwd1 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd1 = !isPwd1"
          />
        </template>
      </q-input>

      <p id='errormessage'>{{ error }}</p>

      <q-btn color="white" text-color="black" @click="login" :disabled="!enableLogin">log in
        <q-spinner-bars
          class="q-ml-md"
          color="primary"
          size="1em"
          v-show="loading"
        />
      </q-btn>

      <p class="paragraph"><a href='/forgotpassword'>Forgot password?</a></p>

      <p id='or'>OR</p>

      <q-btn color="white" text-color="black" @click="handleClickSignIn">
        <img id='google-img' src="../../assets/google-icon.png" />
        Sign In
      </q-btn>

      <p class="paragraph">Don't have account yet? <a href='/register'>Register</a></p>

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
    login: function () {
      this.loading = true
      axios
        .post('/api/auth/login', { password: this.password, email: this.email })
        .then(token => {
          // token to be added to Vuex state in the next step
          console.log(token)
          this.loading = false
        })
        .catch(err => {
          this.error = err
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
              // token to be added to Vuex state in the next step
              console.log(token)
            })
        })
        .catch(err => {
          this.error = err
        })
    }
  },
  computed: {
    // enable "log in button" if all fields are filled
    enableLogin () {
      return !!this.emailField && !!this.passwordField
    }
  }
}
</script>

<style scoped>
.register-container {
  margin-top: 50px
}

#errormessage {
  color: #C10015
}

#google-img {
  height: 1.5rem
}

#or {
  text-align: center;
  margin-top:20px
}

.paragraph {
  margin-top:20px;
  margin-bottom:0
}

a {
  text-decoration: none
}
</style>
