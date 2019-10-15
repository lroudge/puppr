<template>
  <div :key="hello" class="swiping" @change-profile="myMethod">
    <div class="profileInfo" v-on:click="hideInfo" v-if="profileInfo">
      <h2>Bio</h2>
      <p>{{ bio }}</p>
      <h2>Likes</h2>
      <p>{{ likes }}</p>
      <h2>Dislikes</h2>
      <p>{{ dislikes }}</p>
    </div>
    <div
            class="profile"
            :style="{ 'background-image': 'url(' + image + ')' }"
            v-on:click="showInfo"
            v-else
    ></div>
<!--    <profile :profiles-list="profilesList" :current-profile="currentProfile"></profile>-->
    <div class="name-age">
      <h1>{{ name }}, {{ age }}</h1>
      <h2>{{ city }}</h2>
    </div>
<!--    <name-age :profiles-list="profilesList" :current-profile="currentProfile"></name-age>-->
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
import { db } from "../main";
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      profilesList: [
        {
          image: './../static/images/joey.jpg',
          name: 'Joey',
          age: 5,
          city: 'Paris',
          bio: 'I am the goodest boi!',
          likes: 'I like small dogs',
          dislikes: 'Running after a ball'
        },

        {
          image: './../static/images/sasha.jpg',
          name: 'Sasha',
          age: 3,
          city: 'Los Altos',
          bio: 'I am the goodest girle!',
          likes: 'I like running a lot',
          dislikes: 'When my owner leaves for work'
        },

        {
          image: './../static/images/riley.jpeg',
          name: 'Riley',
          age: 7,
          city: 'San Francisco',
          bio: 'I am a model for Instagram and Twitter!',
          likes: 'I like rolling in the mud!',
          dislikes: 'Peanut butter, yuck'
        }],
      hello: 0,
      index: 0,
      profileInfo: false
    };
  },
  methods: {
    showInfo() {
      this.profileInfo = true;
    },
    hideInfo() {
      this.profileInfo = false;
    },
    myMethod (idx){
      // Change this when un-nesting components
      console.log(idx);
      this.index = idx;
      this.hello++;
    },
      nextProfile() {
        if (this.index === this.profilesList.length - 1)
          this.index = 0;
        else this.index++;
      console.log(this.index);
      let idx = this.index;
      this.$emit("change-profile", idx);
    },
    previousProfile() {
      if (this.index === 0)
        this.index = this.profilesList.length - 1;
      else this.index--;
      console.log(this.index);
      let idx = this.index;
      this.$emit("change-profile", idx);
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
  computed: {
    image() {
      return this.profilesList[this.index].image;
    },
    bio() {
      return this.profilesList[this.index].bio;
    },
    likes() {
      return this.profilesList[this.index].likes;
    },
    dislikes() {
      return this.profilesList[this.index].dislikes;
    },
    name() {
      return this.profilesList[this.index].name;
    },
    age() {
      return this.profilesList[this.index].age;
    },
    city() {
      return this.profilesList[this.index].city;
    },
    ...mapGetters({
      User: "user"
    })
  }
};
</script>