<template lang="pug">
Card(style="text-align: center;")
    DataGrid(:data="[data]", :pageSelector="false")
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
            td {{ item.submission_id }}
            td.table-link: router-link(:to="`/user/${item.user.user_id}`") {{ item.user.nickname }}
            td.table-link: router-link(:to="`/problem/${item.problem.problem_id}`") {{ item.problem.problem_id + '. ' + item.problem.title }}
            td(:class="`status-${item.status}`") {{ judgeStatusText[item.status] }}
            td(:class="`status-${item.status == 1 ? 1 : 4}`") {{ item.score }}
            td {{ item.total_time + ' ms' }}
            td {{ Math.round(item.total_space / 1024) + ' KiB' }}
            td {{ languageText[item.language] }}
            td {{ moment(item.submit_time * 1000).format('MM/DD HH:mm:ss') }}
Card(style="text-align: center;")
    DataGrid(:data="test_case", :pageSelector="false")
        template(v-slot:head)
            th 测试点
            th 状态
            th 分数
            th 时间
            th 内存
        template(v-slot:body="{ item, index }")
            td {{ '#' + (index + 1) }}
            td(:class="`detail-${item.status}`") {{ testCaseStatusText[item.status] }}
            td(:class="`status-${item.status == 1 ? 1 : 4}`") {{ item.score }}
            td {{ item.time + ' ms' }}
            td {{ Math.round(item.space / 1024) + ' KiB' }}
Card
    p.section-title(style="margin-top: 0;") 源代码
    pre {{ data.file_content }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import config from '../config';
import { judgeStatusText, testCaseStatusText, languageText } from '../const';
import moment from 'moment';

export default {
    name: 'SubmissionList',
    components: {
        Card,
        DataGrid,
        Tag
    },
    data: function () {
        return {
            data: { user: {}, problem: {} },
            test_case: [],
            moment: moment
        };
    },
    created: function () {
        this.judgeStatusText = judgeStatusText;
        this.testCaseStatusText = testCaseStatusText;
        this.languageText = languageText;
    },
    mounted: function () {
        this.getSubmissionData();
    },
    methods: {
        getSubmissionData: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('get', `${config.apiServer}/submission/detail?submission_id=${this.$route.params.submission_id}`, false);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    this.data = res.data;
                    this.test_case = res.data.detail.test_case;
                }
            };
            xhr.send();
        }
    }
};
</script>

<style scoped>
@import '~@/static/article.css';
@import '~@/static/link.css';

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

.detail-0 {
    color: #3498db !important;
}

.detail-1 {
    color: #52c41a !important;
}

.detail-2 {
    color: #ffc116 !important;
}

.detail-3 {
    color: #ffc116 !important;
}

.detail-4 {
    color: #ffc116 !important;
}

.detail-5 {
    color: #0e1d69 !important;
}

.detail-6 {
    color: #0e1d69 !important;
}

.detail-7 {
    color: #f39c11 !important;
}

.detail-8 {
    color: #0e1d69 !important;
}

.detail-9 {
    color: #0e1d69 !important;
}

.detail-10 {
    color: #0e1d69 !important;
}

.detail-11 {
    color: #0e1d69 !important;
}

.detail-12 {
    color: #fe4c61 !important;
}
</style>
