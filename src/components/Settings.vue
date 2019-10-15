<template>
  <div class="settings">
    <h1>My Settings</h1>
    <div class="settings-form">
      <div>
        <h2>Email</h2>
        <textarea v-model="email" rows="1" placeholder="123@puppr.com"></textarea>
      </div>
      <div>
        <h2>Zip code</h2>
        <textarea v-model="zipCode" rows="1" placeholder="94117"></textarea>
      </div>
      <div>
        <h2>City</h2>
        <textarea v-model="city" rows="1" placeholder="San Francisco"></textarea>
      </div>
      <div class="submit">
        <input type="submit" value="Save my changes" v-on:click="submit"/>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { db , eventHub } from "../main";

import { mapGetters } from "vuex";
export default {
  data() {
    return {}
  }
//       profiles: profiles
//     };
//   },
//   computed: {
//     name() {
//       return this.profilesList[this.index].name;
//     },
//     age() {
//       return this.profilesList[this.currentProfile].age;
//     },
//     city() {
//       return this.profilesList[this.currentProfile].city;
//     }
  // }
};
</script>
