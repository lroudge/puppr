<template>
    <div :key="hello" class="swiping" @change-profile="myMethod">
        <transition name="flip">
            <div
                    class="profileInfo"
                    v-on:click="hideInfo"
                    v-if="profileInfo && dataLoaded && filteredProfiles[index]"
            >
                <h2>Fun Facts</h2>
                <p>{{ filteredProfiles[index].dogInfo.fun_facts }}</p>
                <h2>Likes</h2>
                <p>{{ filteredProfiles[index].dogInfo.likes }}</p>
                <h2>Dislikes</h2>
                <p>{{ filteredProfiles[index].dogInfo.dislikes }}</p>
                <h2>Sex</h2>
                <p>{{ filteredProfiles[index].dogInfo.sex }}</p>
                <h2>Breed</h2>
                <p>{{ filteredProfiles[index].dogInfo.breed }}</p>
            </div>
        </transition>
        <transition name="flip">
            <div
                    class="profile"
                    v-on:click="showInfo"
                    v-if="dataLoaded && !profileInfo && filteredProfiles[index]"
            >
                <img
                        class="profile-img"
                        :src="filteredProfiles[index].images[0]"
                        v-if="filteredProfiles[index].images[0]"
                />
            </div>
        </transition>
        <!--    <profile :profiles-list="profilesList" :current-profile="currentProfile"></profile>-->
        <div class="name-age" v-if="filteredProfiles[index]">
            <h1>{{ filteredProfiles[index].dogInfo.name }}, {{ filteredProfiles[index].dogInfo.age }}</h1>
            <h2>{{ filteredProfiles[index].city }}</h2>
        </div>
        <!--    <name-age :profiles-list="profilesList" :current-profile="currentProfile"></name-age>-->
        <!--   <derps @change-profile="myMethod" /> we need to un-nest components to make everything a part of swiping-->
        <div class="action">
            <img class="pass" src="./../../public/icons/pass02.png" @click="nextProfile"/>
            <img class="reverse" src="./../../public/icons/previous_new.png" @click="previousProfile"/>
            <img class="like" src="./../../public/icons/like02.png" @click="likeProfile"/>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import {db} from "../main";
    import {mapGetters, mapState} from "vuex";

    export default {
        data: function () {
            return {
                hello: 0,
                index: 0,
                profileInfo: false,
                profilesList: [],
                dataLoaded: false
            };
        },
        methods: {
            showInfo() {
                if (!this.user.loggedIn) {
                    alert("You need to log in or sign up to access that feature!");
                    return;
                }
                this.profileInfo = true;
            },
            hideInfo() {
                this.profileInfo = false;
            },
            refreshProfile() {

            },
            myMethod(idx) {
                // Change this when un-nesting components
                console.log(idx);
                this.index = idx;
                this.hello++;
            },
            nextProfile() {
                if (this.index === this.filteredProfiles.length - 1) this.index = 0;
                else this.index++;
                console.log(this.index);
                let idx = this.index;
                this.$emit("change-profile", idx);
            },
            likeProfile() {
                let that = this
                if (!this.user.loggedIn) {
                    alert("You need to log in or sign up to access that feature!");
                    return;
                }
                // check the other user's profile for likes
                const otherUserPro = this.filteredProfiles[this.index];
                const loggedInPro = this.user.profile;
                const otherUserUid = this.filteredProfiles[this.index].user_id;
                const otherUserLikes = this.filteredProfiles[this.index].likes;
                const loggedInUid = this.user.data.localId;
                const loggedInLikes = this.user.profile.likes;
                // returns -1 if index is not found
                let userIdx = otherUserLikes.indexOf(loggedInUid);
                // if logged in user in other user's likes --> create match
                if (userIdx !== -1) {
                    // create new match in matches collection
                    db.collection("matches")
                        .add({
                            user1: {
                                user_id: otherUserPro.user_id,
                                displayName: otherUserPro.displayName,
                                image: otherUserPro.images[0],
                                dogName: otherUserPro.dogInfo.name
                            },
                            user2: {
                                user_id: loggedInUid,
                                displayName: loggedInPro.displayName,
                                image: loggedInPro.images[0],
                                dogName: loggedInPro.dogInfo.name
                            },
                            messages: [],
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            // remove like from other user like list and add match object to
                            // other user's matches list
                            db.collection('users').doc(otherUserPro.user_id)
                                .update({
                                    "likes": firebase.firestore.FieldValue.arrayRemove(userIdx),
                                    "matches": firebase.firestore.FieldValue.arrayUnion({
                                        [loggedInUid]: docRef.id
                                    })
                                    // add match object to both user's profiles match list
                                    // key: other user's uid, value: matchId
                                }).then(function () {
                                db.collection('users').doc(loggedInUid)
                                    .update({
                                        "matches": firebase.firestore.FieldValue.arrayUnion({
                                            [otherUserUid]: docRef.id
                                        })
                                    }).then(function () {
                                    console.log("Document successfully updated and like REMOVED! from")
                                    // that.$store.dispatch('fetchUser')
                                    that.$store.dispatch("fetchProfile", that.user.data.localId)
                                    alert("You have a new match!")
                                })
                            }).catch(function (error) {
                                console.error("Error updating like in document: ", error);
                            })
                                .catch(function (error) {
                                    console.error("Error adding document: ", error);
                                });
                        })
                } else {
                    // add other otherUserId to loggedInUser likes
                    db.collection('users').doc(loggedInUid)
                        .update({
                            "likes": firebase.firestore.FieldValue.arrayUnion(otherUserUid)
                        }).then(function () {
                        // that.$store.dispatch('fetchUser')
                        that.$store.dispatch("fetchProfile", that.user.data.localId)
                        console.log("Document successfully updated and like ADDED!")
                    });
                }
                // if (this.index === this.filteredProfiles.length - 1) this.index = 0;
                // else this.index++;
                // console.log(this.index);
                let idx = this.index;
                this.$emit("change-profile", idx);
            },
            previousProfile() {
                if (this.index === 0) this.index = this.filteredProfiles.length - 1;
                else this.index--;
                console.log(this.index);
                let idx = this.index;
                this.$emit("change-profile", idx);
            },
            getMatches() {
                let that = this;
                if (that.user.loggedIn) {
                    const retList = [];
                    const usersRef = db.collection("users");

                    let query;
                    if (!that.$store.state.user.loggedIn) {
                        query = usersRef;
                    } else {
                        query = usersRef.where(
                            "zipcode",
                            "==",
                            that.$store.state.user.profile.zipcode
                        );
                    }
                    query
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                // doc.data() is never undefined for query doc snapshots
                                let newDict = {};
                                newDict = doc.data();
                                newDict["user_id"] = doc.id;
                                retList.push(newDict);
                            });
                        })
                        .then(function () {
                            that.profilesList = retList;
                            // console.log(that.profilesList);
                            that.dataLoaded = true;
                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error);
                        });
                    that.dataLoaded = true;
                }
            }
        },
        created() {
            //   console.log(this.user)
            this.getMatches();
        },
        // updated() {
        //     this.getMatches();
        // },
        computed: {
            ...mapGetters({
                user: "user"
            }),
            ...mapState({
                user: state => state.user
            }),
            filteredProfiles() {
                const that = this
                let list = []
                if (this.profilesList.length > 0) {
                    // filter out my profile
                    list = this.profilesList.filter(function (item) {
                        return (item.user_id !== that.user.data.localId)
                    })
                    // filter out my likes
                    list = list.filter(function (item) {
                        return !(that.user.profile.likes.includes(item.user_id))
                    })
                    // TODO filter out matches
                    let user = this.$store.getters.user;
                    let matchList = user.profile.matches;
                    let filterMatchList = []
                    if (matchList.length > 0) {
                        matchList.forEach((item) => {
                            filterMatchList.push(Object.keys(item)[0]);
                        })
                    }
                    list = list.filter(function(item) {
                        return !(filterMatchList.includes(item.user_id))
                    })
                return list
                }
            }
        }
    }
    // beforeRouteEnter (f, t, next) {
    //   next( async (vm) => {
    //     await this.$store.dispatch('fetchUser');
    //   })
    // },
    // firestore () {
    //   return {
    //     profilesList: db.collection("users")
    //   };
    // }
    
</script>