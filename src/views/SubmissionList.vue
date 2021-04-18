<template lang="pug">
Card(style="text-align: center;")
    DataGrid(:data="data", :load="getPageData", :pageCount="pageCount", :curPage="curPage")
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
            td.table-link: router-link(:to="`/submission/${item.submission_id}`") {{ item.submission_id }}
            td.table-link: router-link(:to="`/user/${item.user.user_id}`") {{ item.user.nickname }}
            td.table-link: router-link(:to="`/problem/${item.problem.problem_id}`") {{ item.problem.problem_id + '. ' + item.problem.title }}
            td(:class="`status-${item.status}`") {{ judgeStatusText[item.status] }}
            td(:class="`status-${item.status == 1 ? 1 : 4}`") {{ item.score }}
            td {{ item.total_time + ' ms' }}
            td {{ item.total_space + ' KiB' }}
            td {{ languageText[item.language] }}
            td {{ moment(item.submit_time * 1000).format('MM/DD HH:mm:ss') }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import config from '../config';
import { judgeStatusText, languageText } from '../const';
import moment from 'moment';
import axios from 'axios';

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
            pageCount: 1,
            curPage: 1,
            data: []
        };
    },
    created: function () {
        this.judgeStatusText = judgeStatusText;
        this.languageText = languageText;
        
        let xhr = new XMLHttpRequest();
        xhr.open('get', `${config.apiServer}/submission/list?page=${1}`, false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                this.curPage = 1;
                this.data = res.data.submissions;
                this.pageCount = res.data.page_count;
            }
        };
        xhr.send();
    },
    methods: {
        moment: moment,
        getPageData: function (page) {
            axios.get(`${config.apiServer}/submission/list`, {
                params: {
                    page: page
                }
            }).then(res => {
                this.curPage = page;
                this.data = res.data.data.submissions;
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
