<template>
    <div class="signup">
        <transition name="slide">
            <div class="signup-0" v-if="signup0">
                <h1>Sign Up</h1>
                <form action="#" @submit.prevent="submit">
                    <div class="form-group">
                        <h4 for="email">Email</h4>
                        <input type="email" required autofocus v-model="form.email"/>
                    </div>
                    <div class="form-group">
                        <h4 for="password">Password</h4>
                        <input type="password" name="password" required v-model="form.password"/>
                    </div>
                    <div class="form-group">
                        <h4 for="password">Confirm password</h4>
                        <input
                                id="password"
                                type="password"
                                class="form-control"
                                name="password"
                                required
                                v-model="form.password"
                        />
                    </div>
                    <div class="form-group">
                        <button type="submit" @click="submit">Next</button>
                    </div>
                </form>
            </div>
        </transition>
        <transition name="slide">
            <div class="signup-user-profile signup-1" v-if="signup1">
                <h2>My Dog's Profile</h2>
                <div class="user-form">

                    <div class="age-name">
                        <div>
                            <h4>Name</h4>
                            <textarea v-model="form.dogName" rows="1" placeholder="Rex"></textarea>
                        </div>
                        <div>
                            <h4>Age</h4>
                            <textarea v-model="form.dogAge" rows="1" placeholder="5"></textarea>
                        </div>
                        <div>
                            <h4>Sex</h4>
                            <textarea v-model="form.dogSex" rows="1" placeholder="Male"></textarea>
                        </div>
                        <div>
                            <h4>Breed</h4>
                            <textarea v-model="form.dogBreed" rows="1" placeholder="Shiba"></textarea>
                        </div>
                    </div>
                    <div>
                        <h4>Likes</h4>
                        <textarea
                                v-model="form.likes"
                                rows="2"
                                placeholder="Peanut butter, running after pigeons..."
                        ></textarea>
                    </div>
                    <div>
                        <h4>Dislikes</h4>
                        <textarea v-model="form.dislikes" rows="2" placeholder="The mailman, cats..."></textarea>
                    </div>
                    <div>
                        <h4>Fun Facts</h4>
                        <textarea v-model="form.funfacts" rows="4"
                                  placeholder="I eat veggies and fruits!"></textarea>
                    </div>
                    <div class="form-group">
                        <h2>My Info</h2>
                        <div>
                            <h4>Display Name</h4>
                            <textarea required autofocus v-model="form.displayname" placeholder="JaneDoe"
                                      rows="1"></textarea>
                        </div>
                        <div>
                            <h4>City</h4>
                            <textarea required autofocus v-model="form.city" placeholder="San Francisco"
                                      rows="1"></textarea>
                        </div>
                        <div>
                            <h4 for="zipcode">Zip code</h4>
                            <textarea id="zipcode" name="zipcode" required v-model="form.zipcode" placeholder="94117"
                                      rows="1"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <button @click="goBack0">Previous</button>
                        <button type="submit" @click="signUp">Next</button>
                    </div>
                    <div class="form-group">
                        <router-link to="/login">Already have an account? Sign in here!</router-link>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="slide">
            <div class="signup-2" v-if="signup2">
                <div>
                    <h1>Upload your image</h1>
                    <form action="#">
                        <b-form-group placeholder="Choose a file..." label="" label-for="file-large" label-cols-sm="2"
                                      label-size="lg">
                            <b-form-file id="file-large" size="lg" @change="onFileChanged"></b-form-file>
                        </b-form-group>
                        <b-button type="button" @click.prevent="onUpload">Upload</b-button>
                    </form>
                    <div class="myspinner" v-if="spinnerOn">
                        <b-spinner label="Loading..."></b-spinner>
                    </div>
                </div>
                <!--                <div class="my-pictures">-->
                <!--                    <img src="./../static/images/joey.jpg"/>-->
                <!--                    <img src="./../static/images/joey.jpg"/>-->
                <!--                    <img src="./../static/images/joey.jpg"/>-->
                <!--                </div>-->
            </div>
        </transition>
    </div>
</template>

<script>
    import firebase from "firebase";
    import {db, storage} from "../main";
    import {router} from "../routes/index";
    import {mapGetters} from "vuex"

    export default {
        data() {
            return {
                selectedFile: null,
                spinnerOn: false,
                signup0: true,
                signup1: false,
                signup2: false,
                form: {
                    email: "",
                    password: "",
                    zipcode: "",
                    dogName: "",
                    dogAge: "",
                    dogSex: "",
                    dogBreed: "",
                    likes: "",
                    dislikes: "",
                    funfacts: "",
                    firstname: "",
                    lastname: "",
                    displayname: "",
                    city: ""
                }
            };
        },
        computed: {
            ...mapGetters({
                user: "user"
            }),
        },
        methods: {
            goBack0() {
                this.signup0 = true;
                this.signup1 = false;
            },
            submit() {
                let that = this;
                // this.current += 1;
                that.signup0 = false;
                that.signup1 = true;
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.form.email, this.form.password)
                    .then(data => {
                        console.log(data.user);
                        console.log('NEXT');
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            },
            signUp() {
                let that = this;
                let uid = this.user.data.localId;
                db.collection("users")
                    .doc(uid)
                    .set({
                        email: this.form.email,
                        zipcode: this.form.zipcode,
                        displayname: this.form.displayname,
                        // first_name: this.form.firstname,
                        // last_name: this.form.lastname,
                        city: this.form.city,
                        dogInfo: {
                            name: this.form.dogName,
                            age: this.form.dogAge,
                            breed: this.form.dogBreed,
                            fun_facts: this.form.funfacts,
                            likes: this.form.likes,
                            dislikes: this.form.dislikes
                        }
                    })
                    .then(function () {
                        console.log("Document successfully written!");
                        that.signup1 = false;
                        that.signup2 = true;
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            },
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
                        that.spinnerOn = false
                        alert(error);
                    },
                    function () {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            // api call to store DownloadURL to user profile
                            console.log("File available at", downloadURL);
                            let userRef = db.collection("users").doc(that.user.data.localId);
                            return userRef
                                .update({
                                    images:
                                        [downloadURL]
                                })
                                .then(function () {
                                    that.spinnerOn = false
                                    console.log("Document successfully updated!");
                                })
                                .catch(function (error) {
                                    // The document probably doesn't exist.
                                    that.spinnerOn = false
                                    console.error("Error updating document: ", error);
                                });
                        });
                    }
                );
            }
        }
    };
</script>
<style  scoped>
    .myspinner {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 100;
    }
    /* :not(.myspinner) {
        opacity: .5;
    } */

</style>
