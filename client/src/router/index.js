import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/settings/editprofile',
    name: 'editProfile',
    component: () => import('../views/settings/tabs/edit-profile/index.vue')
  },
  {
    path: '/settings/changepassword',
    name: 'changePassword',
    component: () => import('../views/settings/tabs/change-password/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
