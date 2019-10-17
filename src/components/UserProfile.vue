<template>
    <div class="user-profile">
        <h1>My Dog's Profile</h1>
        <div class="my-pictures">
            <img src="./../static/images/joey.jpg">
            <img src="./../static/images/joey.jpg">
            <img src="./../static/images/joey.jpg">
        </div>
        <div class="user-form">
            <div class="age-name">
                <div>
                    <h3>Name</h3>
                    <textarea v-model="dogName" rows="1" placeholder="Rintintin"></textarea>
                </div>
                <div>
                <h3>Age</h3>
                <textarea v-model="dogAge" rows="1" placeholder="5"></textarea>
                </div>
                <div>
                <h3>Sex</h3>
                <textarea v-model="dogSex" rows="1" placeholder="Male"></textarea>
                </div>
            </div>
            <div>
                <h3>Likes</h3>
                <textarea v-model="likes" rows="2" placeholder="Peanut butter, running after pigeons..."></textarea>
            </div>
            <div>
                <h3>Dislikes</h3>
                <textarea v-model="dislikes" rows="2" placeholder="The mailman, cats..."></textarea>
            </div>
            <div>
                <h3>Fun Facts</h3>
                <textarea v-model="bio" rows="4" placeholder="I eat veggies and fruits!"></textarea>
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