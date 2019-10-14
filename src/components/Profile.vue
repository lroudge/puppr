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
  data() {
    return {
      index: 0,
      profileInfo: false
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