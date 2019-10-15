<template>
    <div class="nav-bar">
        <div class="empty" v-if="routeName === 'settings'"></div>
        <router-link :to="{ name: 'settings' }" class="setting-icon" v-if="routeName === 'settings' || routeName === 'myprofile'">
            <img class="setting-icon" src="../static/images/setting-icon.png"></router-link>
        <router-link :to="{ name: 'myprofile' }" class="profile-icon"
                     v-if="routeName === 'swiping' || routeName === 'myprofile' || routeName === 'settings'"><img
                class="profile-icon" src="../static/images/dog-icon.png"></router-link>
        <router-link :to="{ name: 'swiping' }" id="logo"
                     v-if="routeName === 'swiping' || routeName === 'myprofile' ||  routeName === 'matches'"><h1 id="logo">
            PuppR</h1></router-link>
        <router-link :to="{ name: 'matches' }" class="match-icon" v-if="routeName === 'swiping' || routeName === 'matches'"><img
                class="match-icon" src="../static/images/match-icon.png"></router-link>
        <div class="empty" v-if="routeName === 'matches'"></div>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    import firebase from "firebase";

    export default {
        computed: {
            // map `this.user` to `this.$store.getters.user`
            routeName() {
                console.log(this.$route)
                return this.$route.name
            }
        },
        methods: {
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
