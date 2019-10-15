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
                <textarea v-model="dogName" rows="1"></textarea>
            </div>
            <div>
                <h2>Likes</h2>
                <textarea v-model="likes" rows="3"></textarea>
            </div>
            <div>
                <h2>Dislikes</h2>
                <textarea v-model="dislikes" rows="3"></textarea>
            </div>
            <div>
                <h2>Bio</h2>
                <textarea v-model="bio" rows="5"></textarea>
            </div>
            <div class="submit">
                <input type="submit" value="Save my changes" v-on:click="submit"/>
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