<template lang="pug">
Card
    p(style='font-size: 20px; margin: 0px') Hydrogen OJ Problem Set
Card
    DataGrid(:data="data", :load="getPageData", :pageCount="pageCount")
        template(v-slot:head)
            th 状态
            th 题号
            th 题目名称
            th 标签
            th 难度
            th 通过率
        template(v-slot:body="{ item }")
            td -
            td {{ item.pid }}
            td {{ item.title }}
            td: Tag(:text="item.tag")
            td: Tag(:text="item.difficulty")
            td {{ item.ac_count / item.submit_count }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import config from '../config';

export default {
    name: 'ProblemList',
    components: {
        Card,
        DataGrid,
        Tag
    },
    data: function () {
        return {
            itemCount: 15,
            pageCount: 5,
            data: []
        };
    },
    mounted: function() {
        this.getPageData(1);
    },
    methods: {
        getPageData: function (page) {
            let xhr = new XMLHttpRequest();
            xhr.open('get', `${config.apiServer}/problem/list?page=${page}`, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
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

</style>
