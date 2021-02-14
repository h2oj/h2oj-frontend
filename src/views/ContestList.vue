<template lang="pug">
Card(style="text-align: center;")
    DataGrid(:data="data", :load="getPageData", :pageCount="pageCount", :curPage="curPage")
        template(v-slot:head)
            th 序号
            th 比赛名称
            th 赛制
            th 开始时间
            th 结束时间
        template(v-slot:body="{ item }")
            td {{ item.contest_id }}
            td.table-link: router-link(:to="`/contest/${item.contest_id}`") {{ item.title }}
            td IOI
            td {{ moment(item.start_time * 1000).format('YYYY/MM/DD HH:mm:ss') }}
            td {{ moment(item.end_time * 1000).format('YYYY/MM/DD HH:mm:ss') }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import config from '../config';
import moment from 'moment';
import axios from 'axios';

export default {
    name: 'ContestList',
    components: {
        Card,
        DataGrid,
        Tag
    },
    data: function () {
        return {
            itemCount: 15,
            pageCount: 1,
            curPage: 1,
            data: []
        };
    },
    created: async function () {
        let xhr = new XMLHttpRequest();
        xhr.open('get', `${config.apiServer}/contest/list?page=${1}`, false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                this.curPage = 1;
                this.data = res.data.contests;
                this.pageCount = res.data.page_count;
            }
        };
        xhr.send();
    },
    methods: {
        moment: moment,
        getPageData: function (page) {
            axios.get(`${config.apiServer}/contest/list`, {
                params: {
                    page: page
                }
            }).then(res => {
                this.curPage = page;
                this.data = res.data.data.contests;
                this.pageCount = res.data.data.page_count;
            });
        }
    }
};
</script>

<style scoped>
.table-link > a {
    text-decoration: none;
    color: #2f8bc9;
}

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
    color: #0e1d69 !important;
}

.status-4 {
    color: #fe4c61 !important;
}

.status-5 {
    color: #0e1d69 !important;
}
</style>
