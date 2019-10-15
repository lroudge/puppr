<template>
  <div class="match-list">
    <ul>
      <li v-for="profile in profiles">
        <img :src="profile.image" class="image-icon" />
        <p>{{ profile.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import firebase from "firebase";
import { db } from "../main";

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      profiles: [
        {
          image: './src/static/images/joey.jpg',
          name: 'Joey',
          age: 5,
          city: 'Paris',
          bio: 'I am the goodest boi!',
          likes: 'I like small dogs',
          dislikes: 'Running after a ball'
        },

        {
          image: './src/static/images/sasha.jpg',
          name: 'Sasha',
          age: 3,
          city: 'Los Altos',
          bio: 'I am the goodest girle!',
          likes: 'I like running a lot',
          dislikes: 'When my owner leaves for work'
        },

        {
          image: './src/static/images/riley.jpeg',
          name: 'Riley',
          age: 7,
          city: 'San Francisco',
          bio: 'I am a model for Instagram and Twitter!',
          likes: 'I like rolling in the mud!',
          dislikes: 'Peanut butter, yuck'
        }]
    };
  }
};
</script>
