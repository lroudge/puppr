import Vue from "vue/dist/vue.js";
import router from "./routes/index";
import App from "./App.vue";
// import Navbar from "./components/Navbar";
// import Login from './components/Login';
// import Register from './components/Register';
// import Swiping from './components/Swiping';
// import UserProfile from './components/UserProfile';
// import Settings from './components/Settings';
// import Matches from './components/Matches';
// import MatchList from './components/MatchList';
// import Profile from './components/Profile';
// import NameAge from './components/NameAge';
import * as firebase from "firebase";
import store from "./store";

Vue.config.productionTip = false;
// Vue.use(VueFire)

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

export const db = firebase.firestore()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
