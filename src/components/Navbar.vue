<template>
    <div class="nav-bar-root" style="width: 100%;">
    <transition :name="transitionName">
        <div class="nav-bar" v-if="routeName === 'login' || routeName === 'signup'">
            <div class="empty"></div>
            <div class="logo" style="width: 8em; height: 5.5em;">
                <img class="logo-image" src="./../../public/icons/logo.png" style="width: 8em; height: 5.5em;">
            </div>
            <div class="empty"></div>
        </div>
    </transition>
    <transition :name="transitionName">
        <div class="nav-bar" v-if="routeName === 'swiping'">
            <router-link :to="{ name: 'myprofile' }" class="profile-icon">
                <img class="profile-icon" src="./../../public/icons/profile blue.png">
            </router-link>
            <div class="logo" style="width: 8em; height: 5.5em;">
                <img class="logo-image" src="./../../public/icons/logo.png" style="width: 8em; height: 5.5em;">
            </div>
            <router-link :to="{ name: 'matches' }" class="match-icon">
                <img class="match-icon" src="./../../public/icons/matches.png">
            </router-link>
        </div>
    </transition>
    <transition :name="transitionName">
        <div class="nav-bar" v-if="routeName === 'myprofile'">
            <router-link :to="{ name: 'settings' }" class="setting-icon">
                <img class="setting-icon" src="./../../public/icons/settings.png">
            </router-link>
            <img class="profile-icon" src="./../../public/icons/profile blue.png" style="width: 6em; height: 5.5em;">
            <router-link :to="{ name: 'swiping' }" class="logo">
                <img class="logo-image" src="./../../public/icons/logo.png">
            </router-link>
        </div>
    </transition>
    <transition :name="transitionName">
        <div class="nav-bar" v-if="routeName === 'settings'">
            <div class="empty"></div>
            <img class="setting-icon" src="./../../public/icons/settings.png" style="width: 6em; height: 5.5em;">
            <router-link :to="{ name: 'myprofile' }" class="profile-icon">
                <img class="profile-icon" src="./../../public/icons/profile blue.png">
            </router-link>
        </div>
    </transition>
    <transition :name="transitionName">
        <div class="nav-bar" v-if="routeName === 'matches'">
            <router-link :to="{ name: 'swiping' }" class="logo">
                <img class="logo-image" src="./../../public/icons/logo.png">
            </router-link>
            <img class="match-icon" src="./../../public/icons/matches.png" style="width: 6em; height: 5.5em;">
            <div class="empty"></div>
        </div>
    </transition>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    import firebase from "firebase";

    export default {
        data() {
            return {
                transitionName: "slide-left"
            }
        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            routeName() {
                return this.$route.name
            },
            ...mapGetters({
                user: "user"
            })
        },
        watch: {
            '$route'(to, from, next) {
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
                next();
            }
        }
    };
</script>
