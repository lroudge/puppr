import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import SignUp from '../components/Signup'
import Swiping from '../components/Swiping'
import UserProfile from '../components/UserProfile'
import Settings from '../components/Settings'
import Matches from '../components/Matches'
import Landing from '../components/Landing'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/signup',
            name: 'signup',
            component: SignUp
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/swiping',
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
        },
        {
            path: '/',
            name: 'landing',
            component: Landing
        }
    ]
})
