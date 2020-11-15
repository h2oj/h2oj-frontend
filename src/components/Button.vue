<template lang="pug">
input(type="button", :value="text").button
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.button {
    outline: none;
    border-radius: 0;
    padding: 5px 8px;
    border: none;
    background-color: #cccccc;
}

.button:hover {
    transition-duration: 0.3s;
    background-color: #aaaaaa;
}
</style>
