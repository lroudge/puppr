<template>
  <div class="nav-bar">
      <div class="empty" v-if="currentRoute === '/settings'"></div>
        <router-link to="settings" class="setting-icon" v-if="currentRoute === '/settings' || currentRoute === '/myprofile'"><img class="setting-icon" src="../static/images/setting-icon.png"></router-link>
        <router-link to="myprofile" class = "profile-icon" v-if="currentRoute === '/' || currentRoute === '/myprofile' || currentRoute === '/settings'"><img class="profile-icon" src="../static/images/dog-icon.png"></router-link>
        <router-link to="/" id="logo" v-if="currentRoute === '/' || currentRoute === '/myprofile' ||  currentRoute === '/matches'"><h1 id="logo">PuppR</h1></router-link>
        <router-link to="/matches" class="match-icon" v-if="currentRoute === '/' || currentRoute === '/matches'"><img class="match-icon" src="../static/images/match-icon.png"></router-link>
        <div class="empty" v-if="currentRoute === '/matches'"></div>
  </div>
  </template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  data() {
    return {
      currentRoute: this.$route.path
    }
  },
  watch: {
    $route (to, from){
      this.currentRoute = this.$route.path;
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
    }
  }
};
</script>
