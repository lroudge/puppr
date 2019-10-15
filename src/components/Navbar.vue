<template>
    <div class="nav-bar">
        <div class="empty" v-if="routeName === 'settings'"></div>
        <router-link :to="{ name: 'settings' }" class="setting-icon"
                     v-if="routeName === 'settings' || routeName === 'myprofile'">
            <img class="setting-icon" src="./../../public/icons/settings.png"></router-link>
        <router-link :to="{ name: 'myprofile' }" class="profile-icon"
                     v-if="routeName === 'swiping' || routeName === 'myprofile' || routeName === 'settings'"
                     @click="areYouLoggedIn">
            <img class="profile-icon" src="./../../public/icons/profile blue.png"></router-link>
        <router-link :to="{ name: 'swiping' }" class="logo"
                     v-if="routeName === 'swiping' || routeName === 'myprofile' ||  routeName === 'matches'">
            <img class="logo-image" src="./../../public/icons/logo.png"></router-link>
        <router-link :to="{ name: 'matches' }" class="match-icon"
                     v-if="routeName === 'swiping' || routeName === 'matches'"
                     @click="areYouLoggedIn">
            <img class="match-icon" src="./../../public/icons/matches.png"></router-link>
        <div class="empty" v-if="routeName === 'matches'"></div>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    import firebase from "firebase";

    export default {
        data() {
          return {userLoggedIn: false}
        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            routeName() {
                console.log(this.$route)
                return this.$route.name
            }
        },
        methods: {
            areYouLoggedIn() {
                if (!this.userLoggedIn) {
                    alert('You need to log in or sign up to access that feature!');
                }
            },
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        // this.$router.replace({
                        //   name: "home"
                        // });
                    });
            },

        }
    };
</script>
