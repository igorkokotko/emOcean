import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './quasar'
import GAuth from 'vue-google-oauth2'
import {
  clientId
} from './config/config.js'
import moment from 'moment'
Vue.prototype.$moment = moment
Vue.config.productionTip = false

const gauthOption = {
  clientId: clientId,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
