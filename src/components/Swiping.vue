<template>
  <div :key="hello" class="swiping">
    <profile :profiles-list="profilesList" :current-profile="currentProfile"></profile>
    <name-age :profiles-list="profilesList" :current-profile="currentProfile"></name-age>
<!--   <derps @change-profile="myMethod" /> we need to un-nest components to make everything a part of swiping-->
    <div class="action">
      <img class="pass" src="./../../public/icons/pass02.png" @click="nextProfile">
      <img class="reverse" src="./../../public/icons/previous02.png" @click="previousProfile">
      <img class="like" src="./../../public/icons/like02.png" @click="nextProfile">
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db , eventHub } from "../main";
import { mapGetters } from "vuex";
import Profile from "./Profile";
import nameAge from "./NameAge";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      User: "user"
    })
  },
  data: function() {
    return {
      profilesList: [
        {
          image: '../static/images/joey.jpg',
          name: 'Joey',
          age: 5,
          city: 'Paris',
          bio: 'I am the goodest boi!',
          likes: 'I like small dogs',
          dislikes: 'Running after a ball'
        },

        {
          image: '../static/images/sasha.jpg',
          name: 'Sasha',
          age: 3,
          city: 'Los Altos',
          bio: 'I am the goodest girle!',
          likes: 'I like running a lot',
          dislikes: 'When my owner leaves for work'
        },

        {
          image: '../static/images/riley.jpeg',
          name: 'Riley',
          age: 7,
          city: 'San Francisco',
          bio: 'I am a model for Instagram and Twitter!',
          likes: 'I like rolling in the mud!',
          dislikes: 'Peanut butter, yuck'
        }],
      currentProfile: 0,
      hello: 0
    };
  },
  methods: {
    myMethod (e){
      // Change this when un-nesting components
      console.log(e)
      this.currentProfile = e
      this.hello++
    },
      nextProfile() {
        if (this.currentProfile === this.profilesList.length - 1)
          this.currentProfile = 0;
        else this.currentProfile++;
      console.log(this.currentProfile);
      let idx = this.currentProfile;
      eventHub.$emit("change-profile", idx);
    },
    previousProfile() {
      if (this.currentProfile === 0)
        this.currentProfile = this.profilesList.length - 1;
      else this.currentProfile--;
      console.log(this.currentProfile);
      let idx = this.currentProfile;
      eventHub.$emit("change-profile", idx);
    }
  },
  updated() {
    // let that = this;
    // db.collection("users")
    //   .doc(this.User.data.localId)
    //   .get()
    //   .then(function(doc) {
    //     that.profile = doc.data();
    //   });
  },
    components: {
        Profile: Profile,
        nameAge: nameAge,
    }
};
</script>