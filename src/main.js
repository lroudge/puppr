import Vue from "vue";
import BootstrapVue from 'bootstrap-vue'
import router from "./routes/index";
import { firestorePlugin } from 'vuefire'
import App from "./App.vue";
import * as firebase from "firebase";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// General configuration for the Vue app
// And Firebase

Vue.config.productionTip = false;

const configOptions = {
    apiKey: "AIzaSyCxE9roondfXx86qpiV94hMK5v6NI7_G1g",
    authDomain: "puppr-5b1ae.firebaseapp.com",
    databaseURL: "https://puppr-5b1ae.firebaseio.com",
    projectId: "puppr-5b1ae",
    storageBucket: "puppr-5b1ae.appspot.com",
    messagingSenderId: "600788520625",
    appId: "1:600788520625:web:38d0b85bbe7867de501c90",
    measurementId: "G-0PXD203RXN"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

// Tell Vue the plugins it needs to use
Vue.use(firestorePlugin);
Vue.use(BootstrapVue);

// Export the database object to the components
export const db = firebase.firestore();

// Initialisation of the Vue app
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
