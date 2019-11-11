import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import EditUserInfo from '../views'
// import EditPreferences from '../components/SettingsPage/SettingsPageTabs/EditPreferences.vue'
// import EditFollowers from '../components/SettingsPage/SettingsPageTabs/EditFollowers.vue'
// import EditLiked from '../components/SettingsPage/SettingsPageTabs/EditLiked.vue'
// import EditPassword from '../components/SettingsPage/SettingsPageTabs/EditPassword.vue'
// import EditPrivacy from '../components/SettingsPage/SettingsPageTabs/EditPrivacy.vue'
// import EditSaved from '../components/SettingsPage/SettingsPageTabs/EditSaved.vue'
// import DeleteAccount from '../components/SettingsPage/SettingsPageTabs/DeleteAccount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings/index.vue'),
    children: [
      {
        path: 'editProfile',
        component: () => import('../views/Settings/Tabs/EditProfile/index.vue')
      },
      {
        path: 'editPreferences',
        component: () => import('../views/Settings/Tabs/EditPreferences/index.vue')
      },
      {
        path: 'editFollowers',
        component: () => import('../views/Settings/Tabs/EditFollowers/index.vue')
      },
      {
        path: 'editLiked',
        component: () => import('../views/Settings/Tabs/EditLiked/index.vue')
      },
      {
        path: 'changePassword',
        component: () => import('../views/Settings/Tabs/ChangePassword/index.vue')
      },
      {
        path: 'editPrivacy',
        component: () => import('../views/Settings/Tabs/EditPrivacy/index.vue')
      },
      {
        path: 'editSaved',
        component: () => import('../views/Settings/Tabs/EditSaved/index.vue')
      },
      {
        path: 'deleteAccount',
        component: () => import('../views/Settings/Tabs/DeleteAccount/index.vue')
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
