<template lang="pug">
input(:type="password ? 'password': 'text'", :placeholder="placeholder", v-model="value").textfield
</template>

<script>
export default {
    name: 'TextField',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        password: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value: function () {
            this.$emit('update:value', this.value);
        }
    }
};
</script>

<style scoped>
.textfield {
    display: block;
    height: 2em;
    outline: none;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #aaaaaa;
    transition-duration: 0.3s;
    box-sizing: border-box;
    font-size: 1em;
}

.textfield:focus {
    border-bottom: 1px solid #000000;
}
</style>
