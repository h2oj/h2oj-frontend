<template lang="pug">
Card(style="position: relative;")
    .edit
        FontAwesomeIcon(icon="check", @click="update()")
        router-link(custom, v-slot="{ navigate }", :to="`/contest/${$route.params.contest_id}`")
            FontAwesomeIcon(icon="arrow-left", @click="back(navigate)")
    .block
        p.section-subtitle.inline-block.same-width 比赛ID
        p.inline-block {{ $route.params.contest_id }}
    .block
        p.section-subtitle.inline-block.same-width 比赛名称
        el-input(v-model="title", style="width: 32em;")
    .block
        p.section-subtitle.inline-block.same-width 赛制
        el-select(v-model="mode")
            el-option(v-for="(item, index) in contestModeText", :value="index", :label="item")
    .block
        p.section-subtitle.inline-block.same-width 比赛时间
        el-date-picker(v-model="time_range", type="datetimerange")
    p.section-subtitle 比赛简介
    MarkdownEditor(v-model:content="content", ref="content")
    //- .block
        p.section-title.inline(style="padding-right: 0.5em;") 样例数据
        FontAwesomeIcon(icon="plus", @click="addSample()")
    //- template(v-for="(item, index) in sample")
        .block
            p.section-subtitle.inline(style="padding-right: 0.5em;") 样例 \#{{ index + 1 }}
            FontAwesomeIcon(icon="times", @click="deleteSample($event, index)")
        .sample
            TextArea.sample-textarea.scrollbar(v-model="sample[index].input", style="margin-right: 0.5em;")
            TextArea.sample-textarea.scrollbar(v-model="sample[index].output")
</template>

<script>
import Card from '../components/Card.vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import TextField from '../components/TextField.vue';
import Selector from '../components/Selector.vue';
import config from '../config';
import { contestModeText } from '../const';
import axios from 'axios';

export default {
    name: 'ProblemEditor',
    components: {
        Card,
        MarkdownEditor,
        TextField,
        Selector
    },
    data: function () {
        return {
            title: '',
            content: '',
            mode: 0,
            time_range: [0, 0],
            problem: []
        };
    },
    created: async function () {
        this.contestModeText = contestModeText;

        await axios.get(`${config.apiServer}/contest/detail`, {
            params: {
                contest_id: this.$route.params.contest_id
            }
        }).then(res => {
            if (res.status === 200) {
                this.title = res.data.data.title;
                this.time_range[0] = res.data.data.start_time * 1000;
                this.time_range[1] = res.data.data.end_time * 1000;
                this.content = res.data.data.content;
                this.problem = res.data.data.problem;
            }
        });
    },
    methods: {
        update: function () {
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
        },
        back: function (navigate) {
            this.update();
            navigate();
        },
        addSample: function () {
            this.sample.push({ input: '', output: '' });
        },
        deleteSample: function (e, index) {
            e.stopImmediatePropagation();
            this.sample.splice(index, 1);
        }
    }
};
</script>

<style scoped>
@import '~@/static/article.css';

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
    transition-delay: 0.3s;
}

.edit > *:hover {
    color: #686868;
}
</style>
