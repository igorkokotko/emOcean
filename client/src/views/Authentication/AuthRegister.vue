<template>
  <div style="overflow:auto">
    <div class="row register-container">
      <div class="gt-xs offset-sm-2 col-sm-4 offset-md-3 col-md-3">Here should be logo and moto</div>
      <div class="offset-xs-1 col-xs-10 col-sm-4 col-md-3 column">

      <q-input v-model.lazy="email" label="Email" :dense="dense" :rules="[val => checkEmailField(val)]"/>

      <q-input v-model.lazy="nickname" label="Nickname" :dense="dense" :rules="[val => checkNicknameField(val)]"/>

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

      <p id='errormessage'>{{ error }}</p>

      <q-btn color="white" text-color="black" @click='register' :disabled='!enableCreate'>create account
        <q-spinner-bars
          class="q-ml-md"
          color="primary"
          size="1em"
          v-show="loading"
        />
      </q-btn>

      <p id="or">OR</p>

      <q-btn color="white" text-color="black" @click="handleClickSignIn">
        <img id='google-img' src="../../assets/google-icon.png" />
        Sign In
      </q-btn>

      <p style="margin-top:20px">Already have an account? <a href='/login'>Log In</a></p>

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
    register () {
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
    enableCreate () {
      return !!this.emailField && !!this.nicknameField && !!this.passwordField && this.password === this.passwordConfirm
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

a {
  text-decoration: none
}
</style>
