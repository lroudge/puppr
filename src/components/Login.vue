<template>
    <form action="#" @submit.prevent="submit">
    <div class="form-group row">
      <label for="email">Email</label>
      <div class="col-md-6">
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
    </div>

    <div class="form-group row">
      <label for="password">Password</label>

      <div>
        <input
          id="password"
          type="password"
          class="form-control"
          name="password"
          required
          v-model="form.password"
        />
      </div>
    </div>
    <div class="form-group row mb-0">
      <div>
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
     </div>
    </form>
</template>

<script>
import firebase from "firebase";

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
          this.$router.replace({ name: "swiping" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>