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
    border:none;
    border-radius:5px;
    color: #f0f0f0;
    background-color: #7c8cfc;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #616cbe;
}
</style>
