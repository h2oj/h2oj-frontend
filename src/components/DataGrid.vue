<template lang="pug">
table.datagrid
    thead
        tr
            slot(name="head")
    tbody#datagrid
        tr(v-for="(item, index) in data")
            slot(name="body", :item="item", :index="index")
div.page-selector(v-if="pageSelector")
    li.page-top(@click="load(1)", v-if="curPage > 1"): FontAwesomeIcon(icon="angle-double-left")
    li.page-last(@click="load(curPage - 1)", v-if="curPage > 1"): FontAwesomeIcon(icon="angle-left")
    li(v-for="i in cntPage" @click="load(begPage + i - 1)", :class="{'selected': i + begPage - 1 === curPage}").page {{ i + begPage - 1 }}
    li.page-next(@click="load(curPage + 1)", v-if="pageCount > curPage"): FontAwesomeIcon(icon="angle-right")
    li.page-end(@click="load(cntPage)" v-if="pageCount > curPage"): FontAwesomeIcon(icon="angle-double-right")
</template>

<script>
export default {
    name: 'DataGrid',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        load: {
            type: Function,
            default: () => {}
        },
        pageCount: {
            type: Number,
            default: 1
        },
        curPage: {
            type: Number,
            default: 1
        },
        pageSelector: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        begPage: function () {
            if (this.curPage + 4 > this.pageCount) {
                return Math.max(this.pageCount - 8, 1);
            }
            return Math.max(this.curPage - 4, 1);
        },
        cntPage: function () {
            if (this.curPage <= 5) {
                return Math.min(this.pageCount, 9);
            }
            if (this.curPage + 4 > this.pageCount) {
                return Math.min(this.pageCount, 9);
            }
            return Math.min(this.pageCount - this.begPage + 1, 9);
        }
    }
};
</script>

<style>
.datagrid {
    border-spacing: 0px;
    width: 100%;
}

.datagrid > thead > tr > th {
    font-size: 15px;
    font-weight: 500;
    border-bottom: 2px solid #e8e8e8;
}

.datagrid > tbody > tr > td {
    font-size: 17px;
    line-height: 35px;
    border-bottom: 1px solid #e8e8e8;
}

.datagrid > tbody > tr:last-of-type > td {
    border-bottom: 2px solid #e8e8e8;
}
</style>

<style scoped>
.page-selector {
    margin-top: 0.5em;
    text-align: right;
}

.page-selector li {
    display: inline-block;
    list-style: none;
    border: solid 1px #000000;
    border-radius: 20%;
    width: 1em;
    height: 1em;
    padding: 0.2em;
    text-align: center;
    line-height: 1em;
    margin: 0.3em;
}

.selected {
    background-color: #c4c4c4;
}
</style>
