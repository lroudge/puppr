<template>
  <div class="nav-bar">
      <div class="empty" v-if="currentRoute === '/settings'"></div>
        <router-link to="settings" class="setting-icon" v-if="currentRoute === '/settings' || currentRoute === '/myprofile'"><img class="setting-icon" src="setting-icon.png"></router-link>
        <router-link to="myprofile" class = "profile-icon" v-if="currentRoute === '/' || currentRoute === '/myprofile' || currentRoute === '/settings'"><img class="profile-icon" src="dog-icon.png"></router-link>
        <router-link to="/" id="logo" v-if="currentRoute === '/' || currentRoute === '/myprofile' ||  currentRoute === '/matches'"><h1 id="logo">PuppR</h1></router-link>
        <router-link to="/matches" class="match-icon" v-if="currentRoute === '/' || currentRoute === '/matches'"><img class="match-icon" src="match-icon.png"></router-link>
        <div class="empty" v-if="currentRoute === '/matches'"></div>
  </div>
  </template>
  <!-- <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/" class="navbar-brand">Vue Firebase Auth</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>

        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <div class="nav-item">{{user.data.displayName}}</div>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="signOut">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template> -->

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
