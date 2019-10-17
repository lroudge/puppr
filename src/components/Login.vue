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
            <div class="form-group row mb-0">
                    <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <div class="form-group">
                <h5>Don't have an account? Sign up here!</h5>
            </div>
        </form>
        <div class="meet-dogs">
            <div class="dog-pictures"></div>
        <h3>Meet these doggos today!</h3>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import { store } from "../main";

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
        },
        beforeRouteEnter (f, t, next) {
            next( async (vm) => {
                await this.$store.dispatch('fetchUser');
            })
        }
    };
</script>