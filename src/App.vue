<template lang="pug">
Header
.container-main
    router-view
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
    padding: 50px;
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
