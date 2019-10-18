<template>
  <div>
    <h1>Upload your image</h1>
    <form action="#">
      <b-form-group placeholder="Choose a file..." label="" label-for="file-large" label-cols-sm="2" label-size="lg">
        <b-form-file id="file-large" size="lg" @change="onFileChanged"></b-form-file>
      </b-form-group>
      <button type="button" @click.prevent="onUpload">Upload!</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { db, storage } from "../main";
import { router } from "../routes/index";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedFile: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    onFileChanged(event) {
      if (event.target.files[0].size < 4000000) {
        this.selectedFile = event.target.files[0];
      } else {
        alert("Image size must be 4MB or smaller");
      }
    },
    onUpload() {
        const that = this
      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef
        .child(this.user.data.localId + "/" + this.selectedFile.name)
        .put(this.selectedFile);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          // Handle unsuccessful uploads
          alert(error);
        },
        function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // api call to store DownloadURL to user profile
            console.log("File available at", downloadURL);
            let userRef = db.collection("users").doc(that.user.data.localId);
            return userRef
              .update({
                images: 
                    [downloadURL]
              })
              .then(function() {
                console.log("Document successfully updated!");
              })
              .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          });
        }
      );
    }
  }
};
</script>