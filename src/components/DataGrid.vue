<template lang="pug">
table.datagrid
    thead
        tr
            th(v-for="item in headers") {{item}}
    tbody#datagrid
        tr(v-for="item in data")
            td(v-for="(element, i) in item") {{render(i, element)}}
div.page-selector
    li.page-top: i.fa.fa-angle-double-left
    li.page-last: i.fa.fa-angle-left
    - for (let i = 1; i < 10; ++i)
        li(onclick=`loadPage(${i}, 10)`).page: = i
    li.page-next: i.fa.fa-angle-right
    li.page-end: i.fa.fa-angle-double-right
</template>

<script>
export default {
    name: 'DataGrid',
    props: {
        length: Number,
        headers: Array,
        data: Object,
        render: Function
    },
};
</script>

<style scoped>
.datagrid {
    border-spacing: 0px;
    width: 100%;
}

.datagrid th {
    font-size: 15px;
    font-weight: 500;
}

.datagrid td {
    font-size: 17px;
    line-height: 35px;
}

.datagrid > thead > tr > th {
    border-bottom: 2px solid #e8e8e8;
}

.datagrid > tbody > tr > td {
    border-bottom: 1px solid #e8e8e8;
}

.datagrid > tbody > tr:last-of-type > td {
    border-bottom: 2px solid #e8e8e8;
}

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
</style>
