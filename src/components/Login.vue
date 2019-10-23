<template>
    <div class="login">
        <h1>Sign In</h1>
        <form action="#" @submit.prevent="submit">
            <div class="form-group row">
                <h2 for="email">Email</h2>
                <input
                        id="email"
                        type="email"
                        class="form-control"
                        name="email"
                        value
                        required
                        autofocus
                        v-model="form.email"
                />
            </div>
            <div class="form-group row">
                <h2 for="password">Password</h2>
                <input
                        id="password"
                        type="password"
                        class="form-control"
                        name="password"
                        required
                        v-model="form.password"
                />
            </div>
            <div>
                <button type="submit">Log In</button>
            </div>
            <div class="form-group">
                <router-link to="/signup">Don't have an account? Sign up here!</router-link>
            </div>
        </form>
        <div class="bottom-signin">
            <div class="meet-dogs">
                <img src="../../public/images/poppy.png">
                <img src="../../public/images/joey.jpg">
            </div>
            <p>These dogs are waiting to meet yours!</p>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import { db, store } from "../main";

    export default {
        data() {
            return {
                form: {
                    email: "",
                    password: ""
                },
                error: null
            };
        },
        methods: {
            submit() {
                const that = this
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.form.email, this.form.password)
                    .then((data) => {
                        // load the profile of the user in Vuex store
                        console.log(data.user.uid)
                        const ref = db.collection('users').doc(data.user.uid)
                        ref.get().then(function (doc) {
                            that.$store.commit('SET_PROFILE', doc.data())
                            that.$router.replace({name: "swiping"})
                            .then(() => {
                                console.log('Promise returned from replace');
                            })
                        })
                    })
                    // .then(() => {
                    //     console.log('Promise returned from replace');
                    // })
                    .catch(err => {
                        console.log(this.error = err.message);
                    });
            }
        },
        beforeRouteEnter(f, t, next) {
            next(async (vm) => {
                await this.$store.dispatch('fetchUser');
            })
        }
    };
</script>