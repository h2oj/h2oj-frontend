<template lang="pug">
Card.setting-option
    el-menu.menu(mode="vertical", :default-active="select")
        el-menu-item(v-for="(item, index) in content", :index="index", @click="handleSelect(index)").menu-item
            span {{ item }}
</template>

<script>
import Card from './Card.vue';

export default {
    name: 'Menu',
    components: {
        Card
    },
    props: {
        select: {
            type: Number,
            default: 0
        },
        content: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleSelect: function (index) {
            this.$emit('update:select', index);
        }
    }
};
</script>

<style scoped>
.setting-option {
    width: 15em;
    height: fit-content;
}

.menu {
    border: none;
}

.menu-item {
    height: 3em;
    line-height: 3em;
}
</style>
