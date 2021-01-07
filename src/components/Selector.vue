<template lang="pug">
.selector
    .selector-show(@click="handleDrop()")
        span {{ option[cur] }}
        FontAwesomeIcon.selector-icon(icon="angle-down", :class="{ rotate: drop }")
    .selector-list(v-if="drop")
        ul: li(v-for="(item, index) in option" @click="handleChoose(index)") {{ item }}
</template>

<script>
export default {
    name: 'Selector',
    props: {
        current: {
            type: Number,
            default: 0
        },
        option: {
            type: Array,
            default: () => [' ']
        }
    },
    data: function () {
        return {
            cur: this.current,
            drop: false
        };
    },
    watch: {
        current: function (val) {
            this.cur = val;
        }
    },
    methods: {
        handleDrop: function () {
            this.drop = !this.drop;
        },
        handleChoose: function (index) {
            this.cur = index;
            this.drop = false;
        },
        getValue: function () {
            return this.option[this.cur];
        },
        getIndex: function () {
            return this.cur;
        }
    }
};
</script>

<style scoped>
.selector {
    display: inline-block;
    width: 5em;
}

.selector-show {
    position: relative;
    padding: 0.3em;
    border: 1px solid #aaaaaa;
    border-radius: 5px;
}

.selector-icon {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0.4em;
    transition-duration: 0.3s;
}

.rotate {
    transform: rotate(180deg);
}

.selector-list > ul {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #aaaaaa;
    background-color: #ffffff;
}

.selector-list > ul > li {
    line-height: 1.5em;
    padding: 0 0.2em;
}

.selector-list > ul > li:hover {
    background-color: #7c8cfc;
}
</style>
