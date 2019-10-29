<template>
    <div class="landing-page">
        <div class="header-landing">
            <img class="puppr-logo" src="./../../public/icons/logo.png">
            <p :class="choice1" v-on:click="showIntro">
                <img class="paws" src="./../../public/icons/matches.png">
                Introduction</p>
            <p :class="choice2" v-on:click="showFeatures">
                <img class="paws" src="./../../public/icons/matches.png">
                Features</p>
            <p :class="choice3" v-on:click="showAbout">
                <img class="paws" src="./../../public/icons/matches.png">
                About</p>
        </div>
        <div class="upper-container">
            <div class="info-pages">

                <div
                        class="intro"
                        v-if="intro && !features && !about"
                >
                    <h3>Meet friendly doggos in your area!</h3>
                    <p>PuppR is the best place on the internet to meet amazing pups and their owners!</p>
                    <p>Browse through local dogs and connect with their owners to set up a playdate or a walk.</p>
                    <p>If you like a dog and their owner likes your dog back, then you will match!</p>
                </div>
                <div
                        v-if="!intro && features && !about"
                        class="features">
                    <h3>Sign up</h3>
                    <p>Make a profile that shows off your pup and their personality! Upload a picture to show the
                        world.</p>
                    <h3>Browse</h3>
                    <p>Use a familiar and intuitive interface to see dogs in your area and express interest in
                        connecting. You can like, pass or rewind profiles of dogs in your are.</p>
                    <h3>Matches</h3>
                    <p>Keep track of your matches in one convenient location.</p>
                    <p>Hover over a match to display their contact email and communicate plans to connect.</p>
                </div>
                <div
                        v-if="!intro && !features && about"
                        class="about">
                    <h3>Why PuppR?</h3>
                    <p>This is our Portfolio Project, concluding our Foundations Year at <a href="https://www.holbertonschool.com/">Holberton School</a>.
                        We were able to choose who we wanted to work with and what we wanted to work on,
                        as long as we presented a working program at the end of the three weeks of development.</p>
                    <p>The idea of PuppR came from the team's passion for dogs.
                        We know that dogs need to socialize as much as humans and we wanted to create a fun and intuitive interface
                        to connect dog owners.</p>
                    <br>
                    <h4>The Team</h4>
                    <p>Drew Maring - <a href="https://www.linkedin.com/in/drew-maring-0a7b8b9/">LinkedIn</a>
                        &nbsp;<a href="https://github.com/dmaring">GitHub</a>
                        &nbsp;<a href="https://twitter.com/drewmaring">Twitter</a></p>
                    <p>Marc Cavigli - <a href="https://www.linkedin.com/in/marccavigli/">LinkedIn</a>
                        &nbsp;<a href="https://github.com/MCavigli">GitHub</a>
                        &nbsp;<a href="https://twitter.com/MarcCavigli">Twitter</a></p>
                    <p>Laura Roudge - <a href="https://www.linkedin.com/in/lauraroudge/">LinkedIn</a>
                        &nbsp;<a href="https://github.com/lroudge">GitHub</a>
                        &nbsp;<a href="https://twitter.com/LRoudge">Twitter</a></p>
                    <br>
                    <h4>Check out the source code for PuppR!</h4>
                    <a href="https://github.com/lroudge/puppr">puppr on GitHub</a>
                </div>
            </div>
        </div>
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
        },
        computed: {
            choice1() {
                if (this.intro) return "active";
                else return "passive";
            },
            choice2() {
                if (this.features) return "active";
                else return "passive";
            },
            choice3() {
                if (this.about) return "active";
                else return "passive";
            }
        }
    }
</script>

<style scoped>
    /* FOR BROWSER */
    @media screen and (min-width: 567px) {

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
            font-family: "Arial Rounded MT Bold";
            background-color: #FCF9EA;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: 0 auto !important;
            overflow-x: hidden;
            height: 100%;
            width: 100%;
        }

        /* Content for header */
        .header-landing {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 70%;
            padding: 1em !important;
            text-shadow: 1px 1px #6361613b;
        }

        .header-landing > p:hover {
            color: #f8a978;
        }

        .paws {
            height: 37px;
            width: 37px;
        }

        .puppr-logo {
            height: 5em;
        }

        .intro p, .features p, .about p {
            font-size: 20px;
            color: #ffc5a1;
        }

        .intro h3, .features h3, .about h3, .about h4 {
            color: #f8a978;
        }

        .upper-container {
            width: 100%;
            height: 70%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid #ffc5a1;
        }

        /* Content from different tabs */
        .info-pages {
            flex-direction: row;
            align-items: flex-start;
            display: flex;
            justify-content: space-evenly;
            width: 90%;
            height: 90%;
            background-color: #ffffffb3;
            border-radius: 15px;
            -webkit-box-shadow: 0px 0px 26px -6px rgba(0,0,0,0.45);
            text-shadow: 1px 1px #6361613b;
        }

        .intro, .features, .about {
            display: flex;
            flex-direction: column;
            align-items: baseline;
            width: 100%;
            padding: 1em !important;
            animation: fadeIn 1s;
        }
        
        @keyframes fadeIn {
            0% {opacity: 0;}
            100% {opacity: 1;}
        }

        .active {
            font-size: 28px;
            color: #f8a978;
        }

        .passive {
            font-size: 26px;
            color: #ffc5a1;
        }

        /* Button style */
        .login-button {
            opacity: 0.9;
            height: 6em;
            padding-right: 5% !important;
        }

        .login-button:hover {
            opacity: 1;
            height: 6em;
            padding-right: 5% !important;
        }

        .button-container {
            display: flex;
            align-content: center;
            justify-content: flex-end;
        }
    }

    /* FOR MOBILE */
    /*@media screen and (max-width: 566px) {*/

    /*    * {*/
    /*        box-sizing: border-box;*/
    /*        margin: 0;*/
    /*        padding: 0;*/
    /*    }*/

    /*    .landing_page {*/
    /*        background-image: url('./../../public/icons/landing_page_mobile.png');*/
    /*        background-repeat: no-repeat;*/
    /*        background-size: cover;*/
    /*        background-position: center;*/
    /*        display: flex;*/
    /*        flex-direction: column;*/
    /*        justify-content: center;*/
    /*        align-items: center;*/
    /*        font-family: "Arial Rounded MT Bold";*/
    /*        background-color: #FCF9EA;*/
    /*        position: fixed;*/
    /*        top: 0;*/
    /*        bottom: 0;*/
    /*        right: 0;*/
    /*        left: 0;*/
    /*        margin: 0 auto;*/
    /*        overflow-x: hidden;*/
    /*        height: 100%;*/
    /*        width: 100%;*/
    /*    }*/

    /*    .login-button {*/
    /*        margin-bottom: -400px !important;*/
    /*        opacity: 0.9;*/
    /*        height: 60px;*/
    /*    }*/
    /*}*/


</style>