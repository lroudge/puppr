<template>
  <div :key="hello" class="swiping" @change-profile="myMethod">
    <div class="profileInfo" v-on:click="hideInfo" v-if="profileInfo">
      <h2>Fun Facts</h2>
      <p>{{ profilesList[index].dogInfo.fun_facts }}</p>
      <h2>Likes</h2>
      <p>{{ profilesList[index].dogInfo.likes }}</p>
      <h2>Dislikes</h2>
      <p>{{ profilesList[index].dogInfo.dislikes }}</p>
      <h2>Sex</h2>
      <p>{{ profilesList[index].dogInfo.sex }}</p>
      <h2>Breed</h2>
      <p>{{ profilesList[index].dogInfo.breed }}</p>
    </div>
    <div
      class="profile"
      :style="{ 'background-image': 'url(' + profilesList[index].images[0] + ')' }"
      v-on:click="showInfo"
      v-else
    ></div>
    <!--    <profile :profiles-list="profilesList" :current-profile="currentProfile"></profile>-->
    <div class="name-age">
      <h1>{{ profilesList[index].dogInfo.name }}, {{ profilesList[index].dogInfo.age }}</h1>
      <h2>{{ profilesList[index].city }}</h2>
    </div>
    <!--    <name-age :profiles-list="profilesList" :current-profile="currentProfile"></name-age>-->
    <!--   <derps @change-profile="myMethod" /> we need to un-nest components to make everything a part of swiping-->
    <div class="action">
      <img class="pass" src="./../../public/icons/pass02.png" @click="nextProfile" />
      <img class="reverse" src="./../../public/icons/previous02.png" @click="previousProfile" />
      <img class="like" src="./../../public/icons/like02.png" @click="nextProfile" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import { mapGetters, mapState } from "vuex";
import { store } from "../store";

export default {
  data: function() {
    return {
      // profilesList: [],
      hello: 0,
      index: 0,
      profileInfo: false,
      userLoggedIn: this.$store.state.user.loggedIn,
    };
  },
  methods: {
    showInfo() {
      if (!this.userLoggedIn) {
        alert('You need to log in or sign up to access that feature!');
        return;
      }
      this.profileInfo = true;
    },
    hideInfo() {
      this.profileInfo = false;
    },
    myMethod(idx) {
      // Change this when un-nesting components
      console.log(idx);
      this.index = idx;
      this.hello++;
    },
    nextProfile() {
      if (!this.userLoggedIn) {
        alert('You need to log in or sign up to access that feature!');
        return;
      }
      if (this.index === this.profilesList.length - 1) this.index = 0;
      else this.index++;
      console.log(this.index);
      let idx = this.index;
      this.$emit("change-profile", idx);
    },
    previousProfile() {
      if (!this.userLoggedIn) {
        alert('You need to log in or sign up to access that feature!');
        return;
      }
      if (this.index === 0) this.index = this.profilesList.length - 1;
      else this.index--;
      console.log(this.index);
      let idx = this.index;
      this.$emit("change-profile", idx);
    }
  },
  computed: {
    profilesList() {
      return this.$store.getters.profiles;
    },
    ...mapGetters({
      user: "user",
      profilesList: "profiles"
    }),
    ...mapState({
      user: state => state.user,
      profilesList: state => state.profiles
    })
  },
  // beforeRouteEnter (f, t, next) {
  //   next( async (vm) => {
  //     await this.$store.dispatch('fetchUser');
  //   })
  // },
  firestore () {
    const zipCode = this.$store.getters.user.profile.zipcode
    console.log("hellos")
    console.log(this.$store.getters.user.profile.zipcode)
    return {
      profilesList: db.collection("users").where("zipcode", "==", zipCode).get()
    };
  }
};
</script>