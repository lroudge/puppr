<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>


    export default {
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