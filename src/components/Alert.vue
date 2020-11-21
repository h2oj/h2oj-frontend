<template lang="pug">
.alert(v-if="show", @click="hide()")
    FontAwesomeIcon(:icon="icon[type]").icon
    slot
</template>

<script>
export default {
    name: 'Alert',
    props: {
        type: {
            type: String,
            default: 'info'
        }
    },
    data: function () {
        return {
            show: true,
            icon: {
                info: 'check',
                warn: 'check',
                error: 'check'
            }
        };
    },
    methods: {
        hide: function () {
            this.show = false;
        }
    }
};
</script>

<style scoped>
.alert {
    position: fixed;
    z-index: 1;
    top: 70px;
    left: 0px;
    right: 0px;
    width: fit-content;
    padding: 0.5em 1em;
    margin: auto auto;
    background-color: #add8e6;
    border-radius: 0.5em;
    transition-duration: 0.3s;
}

.icon {
    margin-right: 0.5em;
}
</style>
