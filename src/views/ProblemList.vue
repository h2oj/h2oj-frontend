<template lang="pug">
Card
    p(style="font-size: 20px; margin: 0px") Hydrogen OJ Problem Set
    TextField(placeholder="ID / 题目").search-input#search-input
    Button(value="查找", @click="search()").search-button
Card
    DataGrid(:data="data", :load="getPageData", :curPage="curPage", :pageCount="pageCount")
        template(v-slot:head)
            th.table-status 状态
            th.table-pid 题号
            th.table-title 题目名称
            th.table-tag 标签
            th.table-difficulty 难度
            th.table-pass 通过率
        template(v-slot:body="{ item }")
            td.table-status -
            td.table-pid {{ item.pid }}
            td.table-title: router-link(:to="`/problem/${item.pid}`") {{ item.title }}
            td.table-tag: Tag(v-if="item.tag", :text="item.tag")
            td.table-difficulty: Tag(:text="difficulty[item.difficulty]", :class="`tag-difficulty-${item.difficulty}`")
            td.table-pass: Meter(:max="item.submit_count", :val="item.ac_count")
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import Meter from '../components/Meter.vue';
import TextField from '../components/TextField.vue';
import Button from '../components/Button.vue';
import config from '../config';

export default {
    name: 'ProblemList',
    components: {
        Card,
        DataGrid,
        Tag,
        Meter,
        TextField,
        Button
    },
    data: function () {
        return {
            itemCount: 15,
            pageCount: 1,
            curPage: 1,
            data: [],
            difficulty: ['尚未评定', '入门', '普及-', '普及/提高-', '普及+/提高', '提高+/省选-', '省选/NOI-', 'NOI/NOI+/CTSC']
        };
    },
    beforeMount: function() {
        this.getPageData(1);
    },
    methods: {
        getPageData: function (page) {
            let xhr = new XMLHttpRequest();
            xhr.open('get', `${config.apiServer}/problem/list?page=${page}`, false);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    this.curPage = page;
                    this.data = res.data.problems;
                    this.pageCount = res.data.page_count;
                }
            };
            xhr.send();
        },
        search: function () {
            let search = document.getElementById('search-input').value;
            let xhr = new XMLHttpRequest();
            xhr.open('get', `${config.apiServer}/problem/list?page=${1}&search=${search}`, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    this.curPage = 1;
                    this.data = res.data.problems;
                    this.pageCount = res.data.page_count;
                }
            };
            xhr.send();
        }
    }
};
</script>

<style scoped>
.table-status {
    text-align: center;
    width: 80px;
}

.table-pid {
    text-align: left;
    width: 80px;
}

.table-title {
    text-align: left;
}

.table-tag {
    text-align: center;
    width: 150px;
}

.table-pass {
    text-align: center;
    width: 100px;
}

.table-difficulty {
    text-align: center;
    width: 150px;
}

.search-input {
    display: inline-block;
    width: 80%;
}

.search-button {
    margin-left: 10px;
}

.table-title > a {
    text-decoration: none;
    color: #2f8bc9;
    transition: color 0.25s;
}

.table-title > a:hover {
    color: #1b4f72;
}

.tag-difficulty-0 {
    background-color: #bfbfbf !important;
}

.tag-difficulty-1 {
    background-color: #fe4c61 !important;
}

.tag-difficulty-2 {
    background-color: #f39c11 !important;
}

.tag-difficulty-3 {
    background-color: #ffc116 !important;
}

.tag-difficulty-4 {
    background-color: #52c41a !important;
}

.tag-difficulty-5 {
    background-color: #3498db !important;
}

.tag-difficulty-6 {
    background-color: #9d3dcf !important;
}

.tag-difficulty-7 {
    background-color: #0e1d69 !important;
}
</style>
