import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import SignUp from '../components/Signup'
import Register from '../components/Register'
import Swiping from '../components/Swiping'
import UserProfile from '../components/UserProfile'
import Settings from '../components/Settings'
import Matches from '../components/Matches'

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
