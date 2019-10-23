<template>
    <div class="matches">
        <div class="my-matches">
            <h1>My matches</h1>
        </div>
        <div class="match-list">
            <ul v-if="profiles.length">
                <li v-for="profile in profiles">
                    <img :src="profile.images[0]" class="image-icon"/>
                    <p>{{ profile.dogInfo.name }}</p>
                </li>
            </ul>
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
            }),
            // profilesList() {
            //     return this.profiles;
            // }
        },
        methods: {
            loadProfiles: function() {
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