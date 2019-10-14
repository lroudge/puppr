<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>
<script>
    import navBar from "./components/Navbar";
    export default {
        components: {
            navBar
        }
    };
</script>