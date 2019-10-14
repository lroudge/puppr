<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>

         <div class="card-body">
            <div v-if="User" class="alert alert-success" role="alert">You are logged in!</div>
	    {{ User }}
	    </div>
	    {{ profile.dogInfo.name }}
	    <div v-for="image in profile.images">
	    	    <img :src="image">
	    </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

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
        profile: {}
    }
  },
  updated() {
  	let that = this
        db.collection('users').doc(this.User.data.localId).get()
	    .then(function(doc) {
	       that.profile = doc.data()
	       })
}
}
</script>