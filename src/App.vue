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
                // This determines if we should slide to the left or the right, depending on the route
                transitionName: "slide-left"
            }
        },
        // These two functions change the transition name between left and right
        // Depending on which route it's coming from and which route it's going to
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
            '$route' (to, from) {
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
            }
        }
    };
</script>