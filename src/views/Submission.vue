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
            td {{ item.status }}
            td {{ item.status }}
            td {{ item.total_time + ' ms' }}
            td {{ item.total_space + ' KiB' }}
            td {{ item.language }}
            td {{ moment(item.submit_time).format('MM/DD HH:mm:ss') }}
Card
    DataGrid(:data="test_case", :pageSelector="false")
        template(v-slot:head)
            th 测试点
            th 状态
            th 时间
            th 内存
        template(v-slot:body="{ item, index }")
            td {{ '#' + index }}
            td {{ item.status }}
            td {{ item.time + ' ms' }}
            td {{ item.space + ' KiB' }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import config from '../config';
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
            data: {},
            test_case: [],
            moment: moment
        };
    },
    mounted: function() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', `${config.apiServer}/submission/detail?sid=${this.$route.params.sid}`, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                this.data = res.data;
                this.test_case = res.data.detail.test_case;
            }
        };
        xhr.send();
    }
};
</script>

<style scoped>

</style>
