import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Swiping from '../components/Swiping'
import UserProfile from '../components/UserProfile'
import Settings from '../components/Settings'
import Matches from '../components/Matches'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'swiping',
      component: Swiping
    },
    {
      path: '/matches',
      name: 'matches',
      component: Matches
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: UserProfile
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

export default router
