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
.textarea {
    display: block;
    padding: 0.5em;
    font-size: 16px;
    height: fit-content;
    flex: 1;
    outline: none;
    resize: none;
    border: 1px solid #aaaaaa;
    box-sizing: border-box;
    transition-duration: 0.3s;
}

.textarea:focus {
    border: 1px solid #000000;
}
</style>
