<template>
  <div class="row forgot-container">
    <div class="gt-xs offset-sm-2 col-sm-4 offset-md-3 col-md-3 simple-container"><h2>Logo and Motto</h2></div>
    <div class="offset-xs-1 col-xs-10 col-sm-4 col-md-3 column simple-container">
      <p class='paragraph'><strong>Forgot Password?</strong></p>

      <p class='paragraph'>Enter the email address associated with your account</p>

      <p class='paragraph'>We will email you a link to reset your password</p>

      <q-input v-model.lazy="email" label="Email" :dense="dense" :rules="[val => checkEmailField(val)]"/>

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
      dense: false,
      loading: false,
      isInit: true,
      isSignIn: false,
      emailField: false,
      message: ''
    }
  },
  methods: {
    forgot () {
      this.loading = true
      const { email } = this
      axios
        .post('api/auth/send-password-reset-code', { email })
        .then(res => {
          this.showNotif('A reset link has been sent to your email. Check your inbox!')
          this.loading = false
        })
        .catch(err => {
          if (err) {
            this.message = err.response.data.error
          } else {
            this.message = 'Sorry, something went wrong...'
          }
          this.loading = false
        })
    }
  },
  computed: {
    enableForgot () {
      return !!this.emailField
    }
  }
}
</script>

<style scoped>
.forgot-container {
  overflow: auto;
  padding: 50px 0 30px 0;
}

.simple-container {
  padding: 1rem;
  background: #e7f0f1;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.paragraph {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
}

</style>
