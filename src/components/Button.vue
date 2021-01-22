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
    color: #f0f0f0;
    background-color: #293333;
    transition-duration: 0.3s;
}

.button:hover {
    background-color: #111414;
}
</style>
