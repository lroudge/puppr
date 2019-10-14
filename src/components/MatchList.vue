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
      profiles: profiles
    };
  }
};
</script>
