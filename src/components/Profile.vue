
<template>
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
</template>
<script>
import firebase from "firebase";
import { db , eventHub } from "../main";

import { mapGetters } from "vuex";

export const profiles = [
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
  }]

export default {
  data() {
    return {
      index: 0,
      profileInfo: false,
      profilesList: profiles
    }
  },
  methods: {
    showInfo() {
      this.profileInfo = true;
    },
    hideInfo() {
      this.profileInfo = false;
    }
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
    }
  },
  mounted() {
    eventHub.$on('change-profile', idx => {
      this.index = idx;
      this.profileInfo = false;
    })
  }
};
</script>