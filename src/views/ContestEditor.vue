<template lang="pug">
Card(style="position: relative;")
    .edit
        FontAwesomeIcon(icon="check", @click="update()")
        router-link(custom, v-slot="{ navigate }", :to="`/contest/${$route.params.contest_id}`")
            FontAwesomeIcon(icon="arrow-left", @click="back(navigate)")
    .block
        p.section-subtitle.inline-block.same-width 比赛ID
        p.inline-block(v-if="isNew") 新建比赛
        p.inline-block(v-else) {{ $route.params.contest_id }}
    .block
        p.section-subtitle.inline-block.same-width 比赛名称
        el-input(v-model="title", size="medium", style="width: 32em;")
    .block
        p.section-subtitle.inline-block.same-width 赛制
        el-select(v-model="mode", size="medium")
            el-option(v-for="(item, index) in contestModeText", :value="index", :label="item")
    .block
        p.section-subtitle.inline-block.same-width 比赛时间
        el-date-picker(v-model="time_range", size="medium", type="datetimerange")
    p.section-subtitle 比赛简介
    MarkdownEditor(v-model:content="content", ref="content", style="height: 20em;")
    .block
        p.section-subtitle.inline-block(style="padding-right: 0.5em;") 比赛试题
        el-input(v-model="inputAddProblem", size="mini", placeholder="题目ID", style="width: 10em; margin-right: 0.5em;")
        FontAwesomeIcon(icon="plus", @click="handleAddProblem($event, inputAddProblem)")
    DataGrid(:data="problem_detail", :pageSelector="false")
        template(v-slot:head)
            th(style="width: 70px;") 题号
            th 题目名称
            //- th(style="width: 5em;") 分值
            th(style="width: 5em;")
        template(v-slot:body="{ item, index }")
            td {{ item.problem_id }}
            td: router-link(:to="`/problem/${item.problem_id}`") {{ item.title }}
            //- td: el-input(v-model="problem[index].score", size="mini", style="display: flex;")
            td(style="text-align: center;")
                FontAwesomeIcon.btn.control-delete(icon="times", @click="handleRemoveProblem($event, index)")
                FontAwesomeIcon.btn.control-up(icon="arrow-up", @click="handleMoveProblem($event, index, -1)")
                FontAwesomeIcon.btn.control-down(icon="arrow-down", @click="handleMoveProblem($event, index, 1)")
</template>

<script>
import Card from '../components/Card.vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import TextField from '../components/TextField.vue';
import DataGrid from '../components/DataGrid.vue';
import config from '../config';
import { contestModeText } from '../const';
import axios from 'axios';

export default {
    name: 'ContestEditor',
    components: {
        Card,
        MarkdownEditor,
        TextField,
        DataGrid
    },
    props: {
        isNew: Boolean
    },
    data: function () {
        return {
            title: '',
            content: '',
            mode: 0,
            time_range: [0, 0],
            problem: {},
            problem_detail: [],
            inputAddProblem: ''
        };
    },
    created: async function () {
        this.contestModeText = contestModeText;

        if (this.isNew) return;

        await axios.get(`${config.apiServer}/contest/detail`, {
            params: {
                contest_id: this.$route.params.contest_id
            }
        }).then(res => {
            if (res.status === 200) {
                this.title = res.data.data.title;
                this.mode = res.data.data.mode;
                this.time_range[0] = res.data.data.start_time * 1000;
                this.time_range[1] = res.data.data.end_time * 1000;
                this.content = res.data.data.content;
                this.problem = res.data.data.problem;
                this.problem_detail = res.data.data.problem_detail;
            }
        });
    },
    methods: {
        update: function () {
            if (this.isNew) {
                axios.post(`${config.apiServer}/contest/new`, {
                    title: this.title,
                    start_time: this.time_range[0]  / 1000,
                    end_time: this.time_range[1] / 1000,
                    mode: this.mode,
                    content: this.content,
                    problem: this.problem
                }, {
                    headers: {
                        'Authorization': this.$cookie.getCookie('token')
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.status === 200) {
                        this.$swal.fire({
                            icon: 'success',
                            title: '创建成功'
                        });
                    }
                });
            }
            else {
                axios.post(`${config.apiServer}/contest/update`, {
                    contest_id: this.$route.params.contest_id,
                    title: this.title,
                    start_time: this.time_range[0]  / 1000,
                    end_time: this.time_range[1] / 1000,
                    mode: this.mode,
                    content: this.content,
                    problem: this.problem
                }, {
                    headers: {
                        'Authorization': this.$cookie.getCookie('token')
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.status === 200) {
                        this.$swal.fire({
                            icon: 'success',
                            title: '提交成功'
                        });
                    }
                });
            }
        },
        back: function (navigate) {
            this.update();
            navigate();
        },
        handleAddProblem: function (e, problem_id) {
            axios.get(`${config.apiServer}/problem/detail`, {
                params: { problem_id: problem_id, brief: true }
            }).then(res => {
                if (res.status === 200 && res.data.status === 200) {
                    this.problem.push(Number(problem_id));
                    this.problem_detail.push({ problem_id: problem_id, title: res.data.data.title });
                }
            });
            e.stopImmediatePropagation();
        },
        handleRemoveProblem: function (e, index) {
            this.problem.splice(index, 1);
            this.problem_detail.splice(index, 1);
            e.stopImmediatePropagation();
        },
        handleMoveProblem: function (e, index, offset) {
            this.problem[index] = this.problem.splice(index + offset, 1, this.problem[index])[0];
            this.problem_detail[index] = this.problem_detail.splice(index + offset, 1, this.problem_detail[index])[0];
            e.stopImmediatePropagation();
        }
    }
};
</script>

<style scoped>
@import '~@/static/article.css';
@import '~@/static/link.css';

.card {
    position: relative;
}

.same-width {
    min-width: 5em;
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
}

.edit > * {
    padding-left: 0.5em;
    transition-duration: 0.3s;
}

.edit > *:hover {
    color: #8a8a8a;
}

.btn {
    transition-duration: 0.3s;
}

.btn:hover {
    color: #8a8a8a;
}

.control-delete, .control-up, .control-down {
    width: 1.2em;
}

tr:first-child > td > .control-up,
tr:last-child > td > .control-down {
    visibility: hidden;
}
</style>
