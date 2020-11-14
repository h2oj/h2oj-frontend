<template lang="pug">
.meter(:title="title")
    .meter-content(:style="{'width': width}")
</template>

<script>
export default {
    name: 'Meter',
    props: {
        max: {
            type: Number,
            default: 1
        },
        min: {
            type: Number,
            default: 0
        },
        val: {
            type: Number,
            default: 0.5
        }
    },
    computed: {
        width: function () {
            return `${(this.val - this.min) / (this.max - this.min) * 100 || 0}%`;
        },
        title: function () {
            return `${this.val}/${this.max}`;
        }
    }
}
</script>

<style scoped>
.meter {
    width: 100px;
    height: 12px;
    padding: 2px;
    background-color: #ececec; 
}

.meter-content {
    background-color: #7c8cfc;
    height: 100%;
}
</style>
