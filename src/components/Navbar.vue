<template>
    <transition :name="transitionName">
        <div class="nav-bar">
            <div class="empty" v-if="routeName === 'settings' || routeName === 'login' || routeName === 'signup'"></div>
            <router-link :to="{ name: 'settings' }" class="setting-icon"
                         v-if="routeName === 'settings' || routeName === 'myprofile'">
                <img class="setting-icon" src="./../../public/icons/settings.png"></router-link>
            <router-link :to="{ name: 'myprofile' }" @click="areYouLoggedIn"
                         class="profile-icon"
                         v-if="routeName === 'swiping' || routeName === 'myprofile' || routeName === 'settings'">
                <img class="profile-icon" src="./../../public/icons/profile blue.png" @click="areYouLoggedIn">
            </router-link>
            <router-link :to="{ name: 'swiping' }" class="logo"
                         v-if="routeName === 'swiping' || routeName === 'myprofile' ||  routeName === 'matches' || routeName === 'login' || routeName === 'signup'">
                <img class="logo-image" src="./../../public/icons/logo.png"></router-link>
            <router-link :to="{ name: 'matches' }" @click="areYouLoggedIn"
                         class="match-icon"
                         v-if="routeName === 'swiping' || routeName === 'matches'">
                <img class="match-icon" src="./../../public/icons/matches.png" @click="areYouLoggedIn"></router-link>
            <div class="empty" v-if="routeName === 'matches'"></div>
            <router-link :to="{ name: 'login'}" v-if="!userLoggedIn">
                <button>Log In</button>
            </router-link>
        </div>
    </transition>
</template>
<script>
    import {mapGetters} from "vuex";
    import firebase from "firebase";

    export default {
        props: ['transitionName'],
        data() {
            return {
            }
        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            routeName() {
                console.log(this.$route)
                return this.$route.name
            },
            ...mapGetters({
                user: "user"
            }),
            userLoggedIn() {
                return this.user.loggedIn
            }
        },
        beforeRouteLeave(to, from, next) {
            if (!this.user.loggedIn && this.dontMove) {
                next(false);
                console.log('the next was falsed');
            }
        },
        methods: {
            areYouLoggedIn() {
                if (!this.userLoggedIn) {
                    alert('You need to log in or sign up to access that feature!');
                    this.dontMove = true;
                    // This is a hacky way of preventing the route from changing
                    // this.$router.push('/');
                }
            },
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        console.log("Logged Out")
                        // this.$router.replace({
                        //   name: "home"
                        // });
                    });
            }
        },
        watch: {
            '$route' (to, from, next) {
                const toPath = to.path;
                const fromPath = from.path;
                if (fromPath === '/swiping' && toPath === '/myprofile')
                    this.transitionName = 'slide-right';
                else if (fromPath === '/myprofile' && toPath === '/settings')
                    this.transitionName = 'slide-right';
                else if (fromPath === '/matches' && toPath === '/swiping')
                    this.transitionName = 'slide-right';
                else
                    this.transitionName = 'slide-left';
                //setTimeout(function() { next()}, 1000);
            }
        }
    };
</script>
