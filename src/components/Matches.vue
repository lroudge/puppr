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

import { mapGetters } from "vuex";
export default {
  data() {
  }
};
</script>

