<template>
    <div id="app">
<!--        <nav-bar v-show="$route.path === '/' ? false : true"></nav-bar>-->
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import navBar from "./components/Navbar";

    export default {
        // components: {
        //     navBar
        // },
        data() {
            return {
                transitionName: "slide-left"
            }
        },
        beforeRouteUpdate (to, from, next) {
            const toPath = to.path;
            const fromPath = from.path;
            if (fromPath === '/swiping' && toPath === '/myprofile')
                this.transitionName = 'slide-right';
            else if (fromPath === '/myprofile' && toPath === '/settings')
                this.transitionName = 'slide-right';
            else if (fromPath === '/matches' && toPath === '/swiping')
                this.transitionName = 'slide-right';
            else
                this.transitionName = 'slide-left';
            setTimeout(function() { next()}, 1000);
        },
        watch: {
            '$route' (to, from, next) {
                const toPath = to.path;
                const fromPath = from.path;
                if (fromPath === '/swiping' && toPath === '/myprofile')
                    this.transitionName = 'slide-right';
                else if (fromPath === '/myprofile' && toPath === '/settings')
                    this.transitionName = 'slide-right';
                else if (fromPath === '/matches' && toPath === '/swiping')
                    this.transitionName = 'slide-right';
                else
                    this.transitionName = 'slide-left';
                //setTimeout(function() { next()}, 1000);
            }
        }
    };
</script>