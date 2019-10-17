<template>
  <div class="matches">
    <div class="my-matches">
      <h1>My matches</h1>
    </div>
    <match-list></match-list>
  </div>
</template>
<script>
import firebase from "firebase";
import { db , eventHub } from "../main";
import matchList from "./MatchList.vue"
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      profiles: [
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
    }
  },
  components: {
    matchList
  }
};
</script>

