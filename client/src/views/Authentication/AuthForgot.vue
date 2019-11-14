<template>
  <div style="overflow:auto">
    <div class="row register-container">
      <div class="gt-xs offset-sm-2 col-sm-4 offset-md-3 col-md-3">Here should be logo and moto</div>
      <div class="offset-xs-1 col-xs-10 col-sm-4 col-md-3 column">
        <p class='paragraph'><strong>Forgot Password?</strong></p>

        <p class='paragraph'>Enter the email address associated with your account</p>

        <p class='paragraph'>We will email you a link to reset your password</p>

        <q-input v-model="email" label="Email" :dense="dense" :rules="[val => checkEmailField(val)]"/>

        <q-btn class="q-mb-md" color="white" text-color="black" @click="forgot" :disabled="!enableForgot">Send
          <q-spinner-bars
            class="q-ml-md"
            color="primary"
            size="1em"
            v-show="loading"
          />
        </q-btn>

        <a href='/login'><q-btn color="white" text-color="black" style="width:100%">back</q-btn></a>

        <p class="q-mt-md">{{ message }}</p>

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
      dense: false,
      loading: false,
      isInit: true,
      isSignIn: false,
      emailField: false,
      message: ''
    }
  },
  methods: {
    forgot: function () {
      this.loading = true
      axios
        .post('/api/auth/sendpasswordresetcode', { email: this.email })
        .then(res => {
          this.message = 'Email with reset link was sent to your email'
          this.loading = false
        })
        .catch(err => {
          this.message = err
          this.loading = false
        })
    }
  },
  computed: {
    // enable "send" if email is OK
    enableForgot () {
      return !!this.emailField
    }
  }
}
</script>

<style scoped>
.register-container {
  margin-top: 50px
}

.paragraph {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0
}

</style>
