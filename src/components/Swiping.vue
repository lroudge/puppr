<template>
  <div v-if="profilesList" :key="hello" class="swiping" @change-profile="myMethod">
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
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      profilesList: null,
      hello: 0,
      index: 0,
      profileInfo: false,
      // userLoggedIn: this.$store.state.user.loggedIn,
    };
  },
  methods: {
    showInfo() {
      if (!this.user.loggedIn) {
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
      if (!this.user.loggedIn) {
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
      if (!this.user.loggedIn) {
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
    ...mapGetters({
      user: "user"
    }),
    zipcode () {
      return this.$store.state.user.profile.zipcode
    },
    filteredList () {
      // console.log(profilesList.filter(function (profile) {return profile}))
      // return (profilesList.filter(function (profile) {return profile}))
      return (profilesList.filter(function (profile) {return profile}))
    }
  },
  // watch: {
  //   user: {
  //     immediate: true,
  //     handler(user) {
  //       // console.log(user)
  //       this.$bind('profilesList', db.collection("users").where("zipcode", "==", "94107"))
  //     },
  //   }
  // 
  firestore () {
    // let zipcode = 94107
    console.log("hello")
    // let zipcode = (this.zipcode ? this.zipcode : 94107)
    return {
      profilesList: db.collection("users")
      // profilesList: db.collection("users").where("zipcode", "==", 94107)

    };
  }
};
</script>