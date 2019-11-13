<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-sm column fixed register" style="width: 300px">

      <p style="text-align: center; margin-top:20px; margin-bottom: 0"><strong>Forgot Password?</strong></p>

      <p style="text-align: center; margin-top:20px; margin-bottom: 0">Enter the email address associated with your account</p>

      <p style="text-align: center; margin-top:20px">We will email you a link to reset your password</p>

      <q-input v-model="email" label="Email" :dense="dense" :rules="[val => checkEmailField(val)]"/>

      <q-btn color="white" text-color="black" @click="forgot" :disabled="!enableForgot">Send
        <q-spinner-bars
          color="primary"
          size="1em"
          v-show="loading"
        />
      </q-btn>

      <a href='/login'><q-btn color="white" text-color="black" style="width:100%">back</q-btn></a>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validateEmail } from '../../utilities/auth.js'

export default {
  data () {
    return {
      email: '',
      dense: false,
      loading: false,
      isInit: true,
      isSignIn: false,
      emailField: false
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
    forgot: function () {
      this.loading = true
      axios
        .post('/api/auth/sendpasswordresetcode', { email: this.email })
        .then(res => {
          // TODO smth
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
    // enable "send" if email is OK
    enableForgot: function () {
      if (this.emailField) return true
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

.q-spinner {
  margin-left: 10px
}
</style>
