<template lang="pug">
Card.setting-option
    el-menu.menu(mode="vertical", default-active="1")
        el-menu-item(index="1", @click="handleSelect(1)").menu-item
            span 个人信息
        el-menu-item(index="2", @click="handleSelect(2)").menu-item
            span 安全设置
</template>

<script>
import Card from './Card.vue';

export default {
    name: 'UserSettingsMenu',
    components: {
        Card
    },
    props: {
        select: {
            type: Number,
            default: 1
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
