<template lang="pug">
div.circle
    font-awesome-icon(:icon="icon")
</template>

<script>
export default {
    name: 'LoginMethod',
    props: {
        icon: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.circle {
    width: 2em;
    font-size: 120%;
    height: 2em;
    line-height: 2em;
    text-align: center;
    border-radius: 50%;
    display: inline-block;
    margin: 0 0.2em;
}
</style>
