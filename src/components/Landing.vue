<template>
    <div class="landing_page">
        <router-link :to="{ name: 'swiping' }">
            <img class="login-button" src="./../../public/icons/login_button.png">
        </router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        }
    }
</script>

<style scoped>

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

    /* FOR BROWSER */
    @media screen and (min-width: 567px) {

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        .landing_page {
            background-image: url('./../../public/icons/landing_page.png');
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
            height: 120px;
        
        }
    }
</style>