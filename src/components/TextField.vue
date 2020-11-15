<template lang="pug">
input(type="text", :placeholder="placeholder").textfield
</template>

<script>
export default {
    name: 'TextField',
    props: {
        placeholder: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.textfield {
    height: 2em;
    outline: none;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #aaaaaa;
    box-sizing: border-box;
}

.textfield:focus {
    transition-duration: 0.3s;
    border-bottom: 1px solid #000000;
}
</style>
