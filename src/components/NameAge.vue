<template>
  <div class="name-age">
    <h1>{{ name }}, {{ age }}</h1>
    <h2>{{ city }}</h2>
  </div>
</template>
<script>
import firebase from "firebase";
import { db , eventHub } from "../main";

import { mapGetters } from "vuex";
export const profiles = [
  {
    image: 'joey.jpg',
    name: 'Joey',
    age: 5,
    city: 'Paris',
    bio: 'I am the goodest boi!',
    likes: 'I like small dogs',
    dislikes: 'Running after a ball'
  },

  {
    image: 'sasha.jpg',
    name: 'Sasha',
    age: 3,
    city: 'Los Altos',
    bio: 'I am the goodest girle!',
    likes: 'I like running a lot',
    dislikes: 'When my owner leaves for work'
  },

  {
    image: 'riley.jpeg',
    name: 'Riley',
    age: 7,
    city: 'San Francisco',
    bio: 'I am a model for Instagram and Twitter!',
    likes: 'I like rolling in the mud!',
    dislikes: 'Peanut butter, yuck'
  }]
export default {
  data() {
    return {
      index: 0,
      profilesList: profiles
    };
  },
  computed: {
    name() {
      return this.profilesList[this.index].name;
    },
    age() {
      return this.profilesList[this.index].age;
    },
    city() {
      return this.profilesList[this.index].city;
    }
  },
  mounted() {
    eventHub.$on("change-profile", idx => {
      this.index = idx;
    });
  }
};
</script>