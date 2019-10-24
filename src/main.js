import Vue from "vue";
import BootstrapVue from 'bootstrap-vue'
import router from "./routes/index";
import { firestorePlugin } from 'vuefire'
import App from "./App.vue";
import * as firebase from "firebase";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(firestorePlugin)

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

Vue.use(firestorePlugin)
Vue.use(BootstrapVue)
export const db = firebase.firestore()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
