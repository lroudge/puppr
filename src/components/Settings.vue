<template>
    <div class="settings">
        <div class="nav-bar">
            <div class="empty"></div>
            <img class="setting-icon" src="./../../public/icons/settings.png" style="width: 6em; height: 5.5em;">
            <router-link :to="{ name: 'myprofile' }" class="profile-icon">
                <img class="profile-icon" src="./../../public/icons/profile blue.png">
            </router-link>
        </div>
        <div class="settings-container">
            <h1>My Settings</h1>
            <div class="settings-form">
                <div>
                    <h2>Display Name</h2>
                    <textarea v-model="displayName" :placeholder="this.user.profile.displayName" rows="1"></textarea>
                </div>
                <div>
                    <h2>Email</h2>
                    <textarea v-model="email" :placeholder="this.user.profile.email" rows="1"></textarea>
                </div>
                <div>
                    <h2>Zip code</h2>
                    <textarea v-model="zipcode" rows="1" :placeholder="this.user.profile.zipcode"></textarea>
                </div>
                <div>
                    <h2>City</h2>
                    <textarea v-model="city" rows="1" :placeholder="this.user.profile.city"></textarea>
                </div>
                <div class="submit">
                    <input type="submit" value="Save my changes" v-on:click="submit"/>
                </div>
                <div class="myspinner" v-if="spinnerOn">
                    <b-spinner label="Loading..."></b-spinner>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {db} from "../main";
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                displayName: "",
                zipcode: "",
                email: "",
                city: "",
                spinnerOn: false
            }
        },
        computed: {
            // This gets the current logged in user from the store
            ...mapGetters({
                user: "user"
            }),
        },
        methods: {
            // Fires when the user clicks "save my changes"
            // Updates their info in the store and in the db
            submit() {
                let that = this;
                let uid = this.user.data.localId;
                this.spinnerOn = true;
                return db.collection("users")
                    .doc(uid)
                    .update({
                        displayName: (this.displayName || this.user.profile.displayName),
                        email: (this.email || this.user.profile.email),
                        zipcode: (Number(this.zipcode) || Number(this.user.profile.zipcode)),
                        city: (this.city || this.user.profile.city),
                    })
                    .then(function () {
                        // Set the db and then set the store
                        that.$store.dispatch("fetchProfile", that.user.data.localId);
                        that.spinnerOn = false;
                        that.$router.replace({name: "myprofile"});
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                        that.spinnerOn = false
                    });
            }
        }
    };
</script>
<style scoped>
    .myspinner {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 100;
    }
</style>

