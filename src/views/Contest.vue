<template lang="pug">
Card(style="display: flex;")
    p.title.inline-block.no-margin(style="margin-right: 0.5em;") {{ title }}
    el-button(v-if="!hasAttended", size="small", @click="handleAttendContest") 参加
    el-button(v-else, disabled, size="small") 已参加
    router-link(custom, v-slot="{ navigate }", :to="`/contest/${$route.params.contest_id}/edit`")
        FontAwesomeIcon(icon="wrench", @click="navigate").edit
Card.detail
    el-tabs
        el-tab-pane(label="比赛简介")
            MarkdownView(:content="content")
        el-tab-pane(label="试题列表")
            DataGrid(:data="problem_detail", :pageSelector="false")
                template(v-slot:head)
                    th(style="width: 3em;") 状态
                    th(style="width: 5em; text-align: left;") 题号
                    th(style="text-align: left;") 题目名称
                    th(style="width: 5em;") 得分
                template(v-slot:body="{ item, index }")
                    td(style="text-align: center;") -
                    td {{ item.problem_id }}
                    td: router-link(:to="`/problem/${item.problem_id}?contest_id=${$route.params.contest_id}`") {{ item.title }}
                    td(style="text-align: center;") 0
        el-tab-pane(label="比赛排名", style="text-align: center;")
            DataGrid(:data="ranklist", :pageSelector="false")
                template(v-slot:head)
                    th(style="width: 3em;") 排名
                    th(style="width: 10em;") 用户
                    th(style="width: 5em;") 总分
                    th(v-for="(item, index) in problem_detail", style="min-width: 5em;") {{ convertProblemName(index + 1) }}
                template(v-slot:body="{ item, index }")
                    td {{ index + 1 }}
                    td(style="text-align: left;")
                        router-link(:to="`/user/${item.user_id}`") {{ item.nickname }}
                    td {{ item.score }}
                    td(v-for="(problem, index) in problem_detail")
                        div(v-if="rankScore[item.user_id][problem.problem_id]")
                            router-link(:to="`/submission/${rankScore[item.user_id][problem.problem_id].submission_id}`")
                            | {{ rankScore[item.user_id][problem.problem_id].score }}
                        span(v-else)
</template>

<script>
import Card from '../components/Card.vue';
import Tag from '../components/Tag.vue';
import Button from '../components/Button.vue';
import MarkdownView from '../components/MarkdownView.vue';
import MonacoEditor from '../components/MonacoEditor.vue';
import DataGrid from '../components/DataGrid.vue';
import config from '../config';
import axios from 'axios';

export default {
    name: 'Contest',
    components: {
        Card,
        Tag,
        Button,
        MarkdownView,
        MonacoEditor,
        DataGrid
    },
    data: function () {
        return {
            title: '',
            content: '',
            mode: 0,
            startTime: 0,
            endTime: 0,
            problem: [],
            problem_detail: [],
            hasAttended: false,
            ranklist: [],
            rankScore: {}
        };
    },
    created: async function () {
        await axios.get(`${config.apiServer}/contest/detail`, {
            params: {
                contest_id: this.$route.params.contest_id
            }
        }).then(res => {
            if (res.status === 200) {
                this.title = res.data.data.title;
                this.startTime = res.data.data.start_time;
                this.endTime = res.data.data.end_time;
                this.content = res.data.data.content;
                this.problem = res.data.data.problem;
                this.problem_detail = res.data.data.problem_detail;
            }
        });

        await axios.get(`${config.apiServer}/contest/ranklist`, {
            params: {
                contest_id: this.$route.params.contest_id
            }
        }).then(res => {
            if (res.status === 200 && res.data.status === 200) {
                this.ranklist = res.data.data.ranklist;
                for (const player of this.ranklist) {
                    this.rankScore[player.user_id] = {};
                    for (const problem of player.detail) {
                        this.rankScore[player.user_id][problem.problem_id] = {
                            score: problem.score,
                            time: problem.time,
                            space: problem.space,
                            submission_id: problem.submission_id
                        };
                    }
                }
            }
        });

        await axios.post(`${config.apiServer}/contest/has_joined`, {
            contest_id: this.$route.params.contest_id
        }, {
            headers: {
                'Authorization': this.$cookie.getCookie('token')
            }
        }).then(res => {
            if (res.status === 200 && res.data.status === 200) {
                this.hasAttended = res.data.data.has_joined;
            }
        });
    },
    methods: {
        handleAttendContest: async function () {
            await axios.post(`${config.apiServer}/contest/join`, {
                contest_id: this.$route.params.contest_id
            }, {
                headers: {
                    'Authorization': this.$cookie.getCookie('token')
                }
            }).then(res => {
                if (res.status === 200 && res.data.status === 200) {
                    this.hasAttended = true;
                    this.$swal.fire({
                        icon: 'success',
                        title: '已参加'
                    });
                }
            });
        },
        convertProblemName(index) {
            let res = '';
            while (index) {
                res = String.fromCharCode(index % 26 + 64) + res;
                index = Math.floor(index / 26);
            }
            return res;
        }
    }
};
</script>

<style scoped>
@import '~@/static/article.css';

.sample-text {
    display: flex;
}

.sample-text > pre {
    flex: 1;
    font-size: 120%;
    border: solid 1px;
    border-radius: 0.3em;
    padding: 0.5em;
    margin: 0em;
}

.editor {
    text-align: initial;
    height: 500px;
    border: solid 1px #efefef;
}

.edit {
    position: absolute;
    right: 0.7em;
    top: 0.7em;
    transition-duration: 0.3s;
}

.edit:hover {
    color: #686868;
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
