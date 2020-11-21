<template lang="pug">
textarea(:value="modelValue", @input="input($event.target.value)").textarea
</template>

<script>
export default {
    name: 'TextArea',
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    methods: {
        input: function (value) {
            this.$emit('update:modelValue', value);
        },
        value: function () {
            return this.modelValue;
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
    box-sizing: border-box;
}

.textfield:focus {
    transition-duration: 0.3s;
    border-bottom: 1px solid #000000;
}
</style>
