<template>
    <div class="user-profile">
        <div class="nav-bar">
            <router-link :to="{ name: 'settings' }" class="setting-icon">
                <img class="setting-icon" src="./../../public/icons/settings.png">
            </router-link>
            <img class="profile-icon" src="./../../public/icons/profile blue.png" style="width: 6em; height: 5.5em;">
            <router-link :to="{ name: 'swiping' }" class="logo">
                <img class="logo-image" src="./../../public/icons/logo.png">
            </router-link>
        </div>
        <div class="profile-container">
            <h1>My Dog's Profile</h1>
            <div class="my-pictures">
                <img :src="image">
                <form action="#" class="image-form">
                    <h4>Update my picture</h4>
                    <b-form-group label="" label-for="file-small" label-cols-sm="1" label-size="sm">
                        <b-form-file
                                @change="onFileChanged"
                                id="file-small"
                                size="sm">
                        </b-form-file>
                    </b-form-group>
                    <b-button type="button" @click.prevent="onUpload">Upload</b-button>
                </form>
            </div>
            <div class="user-form">
                <div class="age-name">
                    <div>
                        <h3>Name</h3>
                        <textarea v-model="dogName" rows="1" :placeholder="this.user.profile.dogInfo.name"></textarea>
                    </div>
                    <div>
                        <h3>Age</h3>
                        <textarea v-model="dogAge" rows="1" :placeholder="this.user.profile.dogInfo.age"></textarea>
                    </div>
                    <div>
                        <h3>Sex</h3>
                        <textarea v-model="dogSex" rows="1" :placeholder="this.user.profile.dogInfo.sex"></textarea>
                    </div>
                </div>
                <div>
                    <h3>Likes</h3>
                    <textarea v-model="likes" rows="2" :placeholder="this.user.profile.dogInfo.likes"></textarea>
                </div>
                <div>
                    <h3>Dislikes</h3>
                    <textarea v-model="dislikes" rows="2" :placeholder="this.user.profile.dogInfo.dislikes"></textarea>
                </div>
                <div>
                    <h3>Fun Facts</h3>
                    <textarea v-model="bio" rows="4" :placeholder="this.user.profile.dogInfo.fun_facts"></textarea>
                </div>
                <div class="save-logout">
                    <div class="submit">
                        <input type="submit" value="Save my changes" v-on:click="submit"/>
                    </div>
                    <div class="submit">
                        <router-link :to="{ name: 'login' }"><input value="Log Out" v-on:click="signOut"/></router-link>
                    </div>
                </div>
            </div>
            <div class="myspinner" v-if="spinnerOn">
                <b-spinner label="Loading..."></b-spinner>
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from "firebase";
    import {db, eventHub} from "../main";

    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                dogName: "",
                dogAge: "",
                dogSex: "",
                likes: "",
                dislikes: "",
                bio: "",
                spinnerOn: false,
                selectedFile: null,
                newImage: null
            }
        },
        computed: {
            ...mapGetters({
                user: "user"
            }),
            image() {
                return this.user.profile.images[0];
            }
        },
        methods: {
            submit() {
                let that = this
                let uid = this.user.data.localId
                this.spinnerOn = true
                return db.collection("users")
                    .doc(uid)
                    .update({
                        "dogInfo.name": (this.dogName || this.user.profile.dogInfo.name),
                        "dogInfo.age": (this.dogAge || this.user.profile.dogInfo.age),
                        "dogInfo.sex": (this.dogSex || this.user.profile.dogInfo.sex),
                        "dogInfo.likes": (this.likes || this.user.profile.dogInfo.likes),
                        "dogInfo.dislikes": (this.dislikes || this.user.profile.dogInfo.dislikes),
                        "dogInfo.fun_facts": (this.bio || this.user.profile.dogInfo.fun_facts)
                    })
                    .then(function () {
                        // Set the db and then set the store
                        // that.$store.commit('SET_PROFILE', docData);
                        console.log("Document successfully updated!");
                        that.$store.dispatch("fetchProfile", that.user.data.localId)
                        that.spinnerOn = false
                        that.$router.replace({name: "swiping"})
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                        that.spinnerOn = false
                    });
            },
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        console.log("Logged Out");
                    });
            },
            onFileChanged(event) {
                if (event.target.files[0].size < 4000000) {
                    this.selectedFile = event.target.files[0];
                    console.log(this.selectedFile.name)
                } else {
                    alert("Image size must be 4MB or smaller");
                }
            },
            onUpload() {
                const that = this;
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
                    function (snapshot) {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        let progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                        that.spinnerOn = true
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log("Upload is paused");
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log("Upload is running");
                                break;
                        }
                    },
                    function (error) {
                        // Handle unsuccessful uploads
                        that.spinnerOn = false;
                        alert(error);
                    },
                    function () {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            // api call to store DownloadURL to user profile
                            console.log("File available at", downloadURL);
                            that.newImage = downloadURL;
                            let userRef = db.collection("users").doc(that.user.data.localId);
                            return userRef
                                .update({
                                    images:
                                        [downloadURL]
                                })
                                .then(function () {
                                    that.spinnerOn = false;
                                    console.log("Document successfully updated!");
                                    that.$store.dispatch("fetchProfile", that.user.data.localId)
                                })
                                .catch(function (error) {
                                    // The document probably doesn't exist.
                                    that.spinnerOn = false;
                                    console.error("Error updating document: ", error);
                                });
                        });
                    }
                );
            }
        }
    }
</script>
<style scoped>
    .myspinner {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 100;
    }
</style>