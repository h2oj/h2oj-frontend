<template lang="pug">
vue3-progress
Header(ref="header")
.container-main
    router-view(@login="handleLogin")
Footer
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
    name: 'App',
    components: {
        Header,
        Footer
    },
    mounted: function () {
        this.$progress.finish();
    },
    created: function () {
        this.$progress.start();
        // eslint-disable-next-line no-unused-vars
        this.$router.beforeEach((to, from, next) => {
            this.$progress.start();
            next();
        });
        // eslint-disable-next-line no-unused-vars
        this.$router.afterEach((to, from) => {
            this.$progress.finish();
        });
    },
    methods: {
        handleLogin: function (data) {
            this.$refs['header'].handleLogin(data);
        }
    }
};
</script>

<style>
body {
    margin: 0px;
    padding: 0px;
}

.container-main {
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    padding: 50px 10%;
    justify-content: center;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #efefef;
    /* background-image: url('/img/bg.png'); */
    background-attachment: fixed;
    background-size: cover;
}
</style>
