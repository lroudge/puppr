<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form action="#">
      <div class="form-group">
        <h4 for="email">Email</h4>
        <input type="email" required autofocus v-model="form.email" />
      </div>
      <div class="form-group">
        <h4 for="password">Password</h4>
        <input type="password" name="password" required v-model="form.password" />
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
        <h4 for="zipcode">Zip code</h4>
        <input id="zipcode" class="form-control" name="zipcode" required v-model="form.zipcode" />
      </div>
      <div class="form-group">
        <h4>Dog Owners Info</h4>
        <input required autofocus v-model="form.firstname" placeholder="First Name" />
        <input required autofocus v-model="form.lastname" placeholder="Last Name" />
        <input required autofocus v-model="form.city" placeholder="City Name" />
      </div>
    </form>
    <div class="signup-user-profile">
      <h1>My Dog's Profile</h1>
      <div class="my-pictures">
        <img src="./../static/images/joey.jpg" />
        <img src="./../static/images/joey.jpg" />
        <img src="./../static/images/joey.jpg" />
      </div>
      <div class="user-form">
        <div class="age-name">
          <div>
            <h4>Name</h4>
            <textarea v-model="form.dogName" rows="1" placeholder="Rintintin"></textarea>
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
            <textarea v-model="form.dogBreed" rows="1" placeholder="Shepard"></textarea>
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
          <textarea v-model="form.funfacts" rows="4" placeholder="I eat veggies and fruits!"></textarea>
        </div>
        <div class="form-group">
          <button type="submit" @click="submit">Sign up</button>
        </div>
        <div class="form-group">
          <router-link to="/login">Already have an account? Sign in here!</router-link>
        </div>
      </div>
    </div>
    <!--        <div>-->
    <!--            <router-link :to="{ name: 'swiping' }">Take a tour of all the doggos in your area without signing in-->
    <!--            </router-link>-->
    <!--        </div>-->
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  data() {
    return {
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
        city: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          let uid = data.user.uid;
          db.collection("users")
            .doc(uid)
            .set({
              email: this.form.email,
              zipcode: this.form.zipcode,
              first_name: this.form.firstname,
              last_name: this.form.lastname,
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
            .then(function() {
              console.log("Document successfully written!");
              this.$router.replace({name: "swiping"});
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        })
        .catch(err => {
          alert((this.error = err.message));
        });
    }
  }
};
</script>
