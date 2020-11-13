<template lang="pug">
Card
    p(style='font-size: 20px; margin: 0px') Hydrogen OJ Problem Set
Card
    DataGrid(:data="data", :load="getPageData")
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
                    this.data = res.data;
                    console.log(res);
                }
            };
            xhr.send();
        }
    }
};
</script>

<style scoped>
.tag-difficulty-0 {
    background-color: #bfbfbf;
}

.tag-difficulty-1 {
    background-color: #fe4c61;
}

.tag-difficulty-2 {
    background-color: #f39c11;
}

.tag-difficulty-3 {
    background-color: #ffc116;
}

.tag-difficulty-4 {
    background-color: #52c41a;
}

.tag-difficulty-5 {
    background-color: #3498db;
}

.tag-difficulty-6 {
    background-color: #9d3dcf;
}

.tag-difficulty-7 {
    background-color: #0e1d69;
}
</style>
