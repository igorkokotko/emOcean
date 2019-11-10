import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EditUserInfo from '../components/SettingsPage/SettingsPageTabs/EditUserInfo.vue'
import EditPreferences from '../components/SettingsPage/SettingsPageTabs/EditPreferences.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: () => import('../views/SettingsPage.vue'),
    children: [
      {
        path: 'editUserInfo',
        component: EditUserInfo
      },
      {
        path: 'editPreferences',
        component: EditPreferences
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
