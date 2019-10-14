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
export default {
  data() {
    return {
      index: 0
    };
  },
  computed: {
    name() {
      return this.profilesList[this.index].name;
    },
    age() {
      return this.profilesList[this.currentProfile].age;
    },
    city() {
      return this.profilesList[this.currentProfile].city;
    }
  },
  mounted() {
    eventHub.$on("change-profile", idx => {
      this.index = idx;
    });
  }
};
</script>