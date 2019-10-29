<template>
    <div class="matches">
        <div class="nav-bar">
            <router-link :to="{ name: 'swiping' }" class="logo">
                <img class="logo-image" src="./../../public/icons/logo.png">
            </router-link>
            <img class="match-icon" src="./../../public/icons/matches.png" style="width: 6em; height: 5.5em;">
            <div class="empty"></div>
        </div>
        <div class="my-matches">
            <h1>My matches</h1>
        </div>
        <div class="match-list">
            <ul v-if="profiles.length">
                <li v-for="profile in profiles">
                    <div class="dropdown-match">
                        <img :src="profile.images[0]" class="image-icon"/>
                        <p>{{ profile.dogInfo.name }}</p>
                        <div class="popover-match">{{ profile.email }}</div>
                    </div>
                </li>
            </ul>
            <div class="no-matches" v-else>
                <h4>Sorry, there doesn't seem to be anything here...</h4>
                <img src="../../public/icons/sad_puppr.png" class="sorry">
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from "firebase";
    import {db} from "../main";
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                profiles: []
            }
        },
        created() {
            this.loadProfiles();
        },
        computed: {
            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            loadProfiles: function () {
                const that = this;
                let user = this.$store.getters.user;
                let matchList = user.profile.matches;
                console.log(JSON.stringify(matchList));
                if (matchList.length > 0) {
                    matchList.forEach((item) => {
                        console.log(Object.keys(item)[0]);
                        let currentUser;
                        db.collection("users").doc(Object.keys(item)[0]).get().then(function (doc) {
                            currentUser = doc.data();
                            if (!that.profiles.includes(currentUser))
                                that.profiles.push(currentUser);
                        });
                    });
                }
            }
        }
    };
</script>