<template>
    <div class="signup">
        <h1>Sign Up</h1>
        <form action="#">
            <div class="form-group">
                <h4 for="email">Email</h4>
                <input
                        type="email"
                        required
                        autofocus
                        v-model="form.email"
                />
            </div>
            <div class="form-group">
                <h4 for="password">Password</h4>
                <input
                        type="password"
                        name="password"
                        required
                        v-model="form.password"
                />
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
                <input
                        id="zipcode"
                        class="form-control"
                        name="zipcode"
                        required
                        v-model="form.zipcode"
                />
            </div>
        </form>
        <div class="signup-user-profile">
            <h1>My Dog's Profile</h1>
            <div class="my-pictures">
                <img src="./../static/images/joey.jpg">
                <img src="./../static/images/joey.jpg">
                <img src="./../static/images/joey.jpg">
            </div>
            <div class="user-form">
                <div class="age-name">
                    <div>
                        <h4>Name</h4>
                        <textarea v-model="dogName" rows="1" placeholder="Rintintin"></textarea>
                    </div>
                    <div>
                        <h4>Age</h4>
                        <textarea v-model="dogAge" rows="1" placeholder="5"></textarea>
                    </div>
                    <div>
                        <h4>Sex</h4>
                        <textarea v-model="dogSex" rows="1" placeholder="Male"></textarea>
                    </div>
                </div>
                <div>
                    <h4>Likes</h4>
                    <textarea v-model="likes" rows="2" placeholder="Peanut butter, running after pigeons..."></textarea>
                </div>
                <div>
                    <h4>Dislikes</h4>
                    <textarea v-model="dislikes" rows="2" placeholder="The mailman, cats..."></textarea>
                </div>
                <div>
                    <h4>Fun Facts</h4>
                    <textarea v-model="bio" rows="4" placeholder="I eat veggies and fruits!"></textarea>
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
    export default {
        data() {
            return {
                form: {
                    email: "",
                    password: "",
                    zipcode: ""
                },
                error: null
            };
        },
        methods: {
            submit() {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.form.email, this.form.password)
                    .then(data => {
                        this.$router.replace({name: "swiping"});
                    })
                    .catch(err => {
                        this.error = err.message;
                    });
            }
        }
    }
</script>
