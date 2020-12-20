<template lang="pug">
Card
    p(style='font-size: 20px; margin: 0px') Hydrogen OJ Problem Set
Card
    DataGrid(:data="data", :load="getPageData", :pageCount="pageCount")
        template(v-slot:head)
            th 序号
            th 用户名
            th 题目名称
            th 状态
            th 分数
            th 时间
            th 内存
            th 语言
            th 上传时间
        template(v-slot:body="{ item }")
            td {{ item.sid }}
            td {{ item.uid }}
            td {{ item.pid }}
            td {{ item.status }}
            td {{ item.status }}
            td {{ item.total_time }}
            td {{ item.total_space }}
            td {{ item.language }}
            td {{ item.submit_time }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import config from '../config';

export default {
    name: 'SubmissionList',
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
            xhr.open('get', `${config.apiServer}/submission/list?page=${page}`, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    this.data = res.data.submissions;
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
