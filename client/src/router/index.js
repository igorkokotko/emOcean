import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EditUserInfo from '../components/SettingsPage/SettingsPageTabs/EditUserInfo.vue'
import EditPreferences from '../components/SettingsPage/SettingsPageTabs/EditPreferences.vue'
import EditFollowers from '../components/SettingsPage/SettingsPageTabs/EditFollowers.vue'
import EditLiked from '../components/SettingsPage/SettingsPageTabs/EditLiked.vue'
import EditPassword from '../components/SettingsPage/SettingsPageTabs/EditPassword.vue'
import EditPrivacy from '../components/SettingsPage/SettingsPageTabs/EditPrivacy.vue'
import EditSaved from '../components/SettingsPage/SettingsPageTabs/EditSaved.vue'
import DeleteAccount from '../components/SettingsPage/SettingsPageTabs/DeleteAccount.vue'

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
      },
      {
        path: 'editFollowers',
        component: EditFollowers
      },
      {
        path: 'editLiked',
        component: EditLiked
      },
      {
        path: 'editPassword',
        component: EditPassword
      },
      {
        path: 'editPrivacy',
        component: EditPrivacy
      },
      {
        path: 'editSaved',
        component: EditSaved
      },
      {
        path: 'deleteAccount',
        component: DeleteAccount
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
