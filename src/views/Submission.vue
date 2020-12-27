<template lang="pug">
Card
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
            td {{ item.sid }}
            td.table-link: router-link(:to="`/user/${item.user.uid}`") {{ item.user.nickname }}
            td.table-link: router-link(:to="`/problem/${item.problem.pid}`") {{ item.problem.pid + '. ' + item.problem.title }}
            td(:class="`status-${item.status}`") {{ statusToText(item.status) }}
            td(:class="`status-${item.status == 1 ? 1 : 3}`") {{ item.status == 1 ? 100 : 0 }}
            td {{ item.total_time + ' ms' }}
            td {{ (item.total_space / 1024) + ' KiB' }}
            td {{ item.language }}
            td {{ moment(item.submit_time * 1000).format('MM/DD HH:mm:ss') }}
Card
    DataGrid(:data="test_case", :pageSelector="false")
        template(v-slot:head)
            th 测试点
            th 状态
            th 时间
            th 内存
        template(v-slot:body="{ item, index }")
            td {{ '#' + index }}
            td(:class="`detail-${item.status}`") {{ statusDetailToText(item.status) }}
            td {{ item.time + ' ms' }}
            td {{ (item.space / 1024) + ' KiB' }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import config from '../config';
import { statusText, statusDetailText } from '../const';
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
    mounted: function() {
        this.getSubmissionData();
    },
    methods: {
        getSubmissionData: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('get', `${config.apiServer}/submission/detail?sid=${this.$route.params.sid}`, false);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    this.data = res.data;
                    this.test_case = res.data.detail.test_case;
                }
            };
            xhr.send();
        },
        statusToText: function (status) {
            return statusText[status];
        },
        statusDetailToText: function (status) {
            return statusDetailText[status];
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
    color: #fe4c61 !important;
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
    color: #0e1d69 !important;
}

.detail-4 {
    color: #0e1d69 !important;
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
    color: #0e1d69 !important;
}

.detail-13 {
    color: #fe4c61 !important;
}
</style>
