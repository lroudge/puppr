<template>
  <div :key="hello" class="swiping" @change-profile="myMethod">
    <div class="profileInfo" v-on:click="hideInfo" v-if="profileInfo">
      <h2>Bio</h2>
      <p>{{ profilesList[index].dogInfo.funFacts }}</p>
      <h2>Info</h2>
      <p>{{ profilesList[index].dogInfo.otherInfo }}</p>
      <h2>Age</h2>
      <p>{{ profilesList[index].dogInfo.age }}</p>
    </div>
    <div
      class="profile"
      :style="{ 'background-image': 'url(' + profilesList[index].images[0] + ')' }"
      v-on:click="showInfo"
      v-else
    ></div>
    <!--    <profile :profiles-list="profilesList" :current-profile="currentProfile"></profile>-->
    <div class="name-age">
      <h1>{{ profilesList[index].dogInfo.name }}, {{ profilesList[index].dogInfo.age }}</h1>
      <h2>{{ profilesList[index].dogInfo.city }}</h2>
    </div>
    <!--    <name-age :profiles-list="profilesList" :current-profile="currentProfile"></name-age>-->
    <!--   <derps @change-profile="myMethod" /> we need to un-nest components to make everything a part of swiping-->
    <div class="action">
      <img class="pass" src="./../../public/icons/pass02.png" @click="nextProfile" />
      <img class="reverse" src="./../../public/icons/previous02.png" @click="previousProfile" />
      <img class="like" src="./../../public/icons/like02.png" @click="nextProfile" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import { mapGetters } from "vuex";


export default {
  data: function() {
    return {
      profilesList: [],
      hello: 0,
      index: 0,
      profileInfo: false,
    };
  },
  methods: {
    showInfo() {
      this.profileInfo = true;
    },
    hideInfo() {
      this.profileInfo = false;
    },
    myMethod(idx) {
      // Change this when un-nesting components
      console.log(idx);
      this.index = idx;
      this.hello++;
    },
    nextProfile() {
      if (this.index === this.profilesList.length - 1) this.index = 0;
      else this.index++;
      console.log(this.index);
      let idx = this.index;
      this.$emit("change-profile", idx);
    },
    previousProfile() {
      if (this.index === 0) this.index = this.profilesList.length - 1;
      else this.index--;
      console.log(this.index);
      let idx = this.index;
      this.$emit("change-profile", idx);
    }
  },
  computed: {
    ...mapGetters({
      User: "user"
    })
  },
  firestore() {
    return {
      profilesList: db.collection("users")
    };
  }
};
</script>