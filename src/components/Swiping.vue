<template>
  <div class="swiping">
    <profile :profiles-list="profilesList" :current-profile="currentProfile"></profile>
    <name-age :profiles-list="profilesList" :current-profile="currentProfile"></name-age>
    <div class="action">
      <img class="pass" src="../static/images/pass-icon.png" @click="nextProfile" />
      <img class="reverse" src="../static/images/reverse-icon.png" @click="previousProfile" />
      <img class="like" src="../static/images/heart-icon.png" @click="nextProfile" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db, eventHub } from "../main";
import { mapGetters } from "vuex";
import Profile from "./Profile";
import nameAge from "./NameAge";
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
  created() {
    let that = this;
    const retList = []
    const usersRef = db.collection("users");
    const query = usersRef.where("zipcode", "==", 94107);
    query.get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          let newDict = {};
          newDict = doc.data();
          newDict['user_id'] = doc.id
          retList.push(newDict);
        });
      })
      .then(function () {
        that.profilesList = retList
        // console.log(that.profilesList)
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  },
  components: {
    Profile: Profile,
    nameAge: nameAge
  }
};
</script>