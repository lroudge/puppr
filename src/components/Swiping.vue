<template>
  <div class="swiping">
    <profile :profiles-list="profilesList" :current-profile="currentProfile"></profile>
    <name-age :profiles-list="profilesList" :current-profile="currentProfile"></name-age>
    <div class="action">
      <img class="pass" src="pass-icon.png" @click="nextProfile" />
      <img class="reverse" src="reverse-icon.png" @click="previousProfile" />
      <img class="like" src="heart-icon.png" @click="nextProfile" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db , eventHub } from "../main";

import { mapGetters } from "vuex";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      User: "user"
    })
  },
  data: function() {
    return {
      profilesList: [],
      currentProfile: 0
    };
  },
  methods: {
    nextProfile() {
      if (this.currentProfile === this.profilesList.length - 1)
        this.currentProfile = 0;
      else this.currentProfile++;
      console.log(this.currentProfile);
      let idx = this.currentProfile;
      eventHub.$emit("change-profile", idx);
    },
    previousProfile() {
      if (this.currentProfile === 0)
        this.currentProfile = this.profilesList.length - 1;
      else this.currentProfile--;
      console.log(this.currentProfile);
      let idx = this.currentProfile;
      eventHub.$emit("change-profile", idx);
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
  }
};
</script>