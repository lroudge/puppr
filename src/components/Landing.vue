<template>
    <div class="landing-page">
        <div class="header-landing">
            <img class="puppr-logo" src="./../../public/icons/logo.png">
            <p class="choice1" v-on:click="showIntro">
                <img class="paws" src="./../../public/icons/matches.png">
                Introduction</p>
            <p class="choice2" v-on:click="showFeatures">
                <img class="paws" src="./../../public/icons/matches.png">
                Features</p>
            <p class="choice3" v-on:click="showAbout">
                <img class="paws" src="./../../public/icons/matches.png">
                About</p>
        </div>
        &nbsp
        <div class="nest-container">
            <div class="info-pages">

                <div
                    class="intro"
                    v-if="intro && !features && !about"
                    >
                        <h3>Meet friendly doggos in your area!</h3>
                        &nbsp
                        <p>The best place on the internet to meet amazing pups and their owners!</p>
                        <p>Browse through local dogs and connect with their owners to set up a playdate.</p>
                        <p>If you like a dog and their owner likes your dog back, then you will match!</p>
                </div>
                <div
                    v-if="!into && features && !about"
                    class="features">
                        <h3>Sign up</h3>
                        <p>Make a profile that shows off your pup and their personality! Upload a picture to show the world.</p>
                        <h3>Browse</h3>
                        <p>Use the a familiar and intuitive interface to see dogs in your area and express interest in connecting.</p>
                        <h3>Matches</h3>
                        <p>Keep track of your matches in one convenient location.</p>
                        <p>Display the contact email for matched dogs and communicate plans to connect.</p>
                </div>
                <div
                    v-if="!intro && !features && about"
                    class="about">
                        <h3>About section!</h3>
                </div>
            </div>
        </div>
        &nbsp
        &nbsp
        <router-link class="button-container" :to="{ name: 'login' }">
            <img class="login-button" src="./../../public/icons/login_button.png">
        </router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                intro: true,
                features: false,
                about: false
            };
        },
        methods: {
            showIntro() {
                this.intro = true;
                this.features = false;
                this.about = false;
            },
            showFeatures() {
                this.intro = false;
                this.features = true;
                this.about = false;
            },
            showAbout() {
                this.intro = false;
                this.features = false;
                this.about = true;
            }
        }
    }
</script>

<style scoped>
    /* FOR BROWSER */
    @media screen and (min-width: 567px) {
        /* Content for header */
        .header-landing {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
        }

        .header-landing > p {
            font-size: 26px;
            color: #ffc5a1;
        }

        .header-landing > p:hover {
        /* .choice1:hover, .choice2:hover, .choice3:hover { */
            color: #f8a978;
        }

        .paws {
            height: 37px;
            width: 37px;
        }

        .puppr-logo {
            width: 17%;
            height: 140px;
        }

        .intro > p, .features > p, .about > p {
            font-size: 20px;
        }

        /* Contains everything in 2nd row */
        .nest-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: flex-start;
        }

        /* Content from different tabs */
        .info-pages {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 70%;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        .landing-page {
            background-image: url('./../../public/icons/landing_page.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            /* display: flex;
            flex-direction: column; */
            /* justify-content: space-between; */
            /* align-items: center; */
            font-family: "Arial Rounded MT Bold";
            background-color: #FCF9EA;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: 0 auto;
            overflow-x: hidden;
            height: 100%;
            width: 100%;
        }

        /* Button style */
        .login-button {
            opacity: 0.9;
            height: 120px;
        }
        .button-container {
            display: flex;
            align-content: center;
        }
    }
    /* FOR MOBILE */
    @media screen and (max-width: 566px) {

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        .landing_page {
            background-image: url('./../../public/icons/landing_page_mobile.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: "Arial Rounded MT Bold";
            background-color: #FCF9EA;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: 0 auto;
            overflow-x: hidden;
            height: 100%;
            width: 100%;
        }
 
        .login-button {
            margin-bottom: -400px !important;
            opacity: 0.9;
            height: 60px;
        }
    }


</style>