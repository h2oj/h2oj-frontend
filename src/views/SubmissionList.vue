<template lang="pug">
Card(style="text-align: center;")
    DataGrid(:data="data", :load="getPageData", :pageCount="pageCount")
        template(v-slot:head)
            th 状态
            th 题号
            th 题目名称
            th 标签
            th 难度
            th 通过率
        template(v-slot:body="{ item }")
            td.table-link: router-link(:to="`/submission/${item.sid}`") {{ item.sid }}
            td.table-link: router-link(:to="`/user/${item.user.uid}`") {{ item.user.nickname }}
            td.table-link: router-link(:to="`/problem/${item.problem.pid}`") {{ item.problem.pid + '. ' + item.problem.title }}
            td(:class="`status-${item.status}`") {{ statusToText(item.status) }}
            td(:class="`status-${item.status == 1 ? 1 : 3}`") {{ item.status == 1 ? 100 : 0 }}
            td {{ item.total_time + ' ms' }}
            td {{ (item.total_space / 1024) + ' KiB' }}
            td {{ item.language }}
            td {{ moment(item.submit_time * 1000).format('MM/DD HH:mm:ss') }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import config from '../config';
import { statusText } from '../const';
import moment from 'moment';

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
        moment: moment,
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
        },
        statusToText: function (status) {
            return statusText[status];
        }
    }
};
</script>

<style scoped>

.table-link > a:hover {
    color: #1b4f72;
}

.status-0 {
    color: #3498db !important;
}

.status-1 {
    color: #52c41a !important;
}

.status-2 {
    color: #ffc116 !important;
}

.status-3 {
    color: #fe4c61 !important;
}
</style>
