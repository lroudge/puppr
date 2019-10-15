<template>
    <div class="user-profile">
        <h1>My Profile</h1>
        <div class="my-pictures">
            <img src="./../static/images/joey.jpg">
            <img src="./../static/images/joey.jpg">
            <img src="./../static/images/joey.jpg">
        </div>
        <div class="user-form">
            <div>
                <h2>Doggo's name</h2>
                <input type="text" v-model="dogName"/>
            </div>
            <div>
                <h2>Likes</h2>
                <input type="text" v-model="likes"/>
            </div>
            <div>
                <h2>Dislikes</h2>
                <input type="text" v-model="dislikes"/>
            </div>
            <div>
                <h2>Bio</h2>
                <input type="text" v-model="bio"/>
            </div>
            <div>
                <h2>Save my changes</h2>
                <input type="submit" value="Submit" v-on:click="submit"/>
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
            return {}
//     return {
//       profiles: profiles
//     };
//   },
//   computed: {
//     name() {
//       return this.profilesList[this.index].name;
//     },
//     age() {
//       return this.profilesList[this.currentProfile].age;
//     },
//     city() {
//       return this.profilesList[this.currentProfile].city;
//     }
//   }
        }
    }
</script>