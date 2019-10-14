import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Swiping from '../components/Swiping'
import UserProfile from '../components/UserProfile'
import Settings from '../components/Settings'
import Matches from '../components/Matches'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Swiping',
      component: Swiping
    },
    {
      path: '/matches',
      component: Matches
    },
    {
      path: '/myprofile',
      component: UserProfile
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})

export default router
