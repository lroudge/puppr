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
export default {
  props: [
    'profiles-list',
    'current-profile'
  ],
  data() {
    return {
      index: 0,
      profileInfo: false,
      // image: this.profilesList[this.currentProfile].images[0]
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
      return this.profilesList[this.currentProfile].images[0];
    },
    bio() {
      return this.profilesList[this.currentProfile].bio;
    },
    likes() {
      return this.profilesList[this.currentProfile].likes;
    },
    dislikes() {
      return this.profilesList[this.currentProfile].dislikes;
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