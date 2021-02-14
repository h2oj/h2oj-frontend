<template lang="pug">
Card.card
    .edit
        FontAwesomeIcon(icon="check", @click="update()")
        router-link(custom, v-slot="{ navigate }", :to="`/contest/${$route.params.contest_id}`")
            FontAwesomeIcon(icon="arrow-left", @click="back(navigate)")
    .block
        p.section-title.inline.same-width 比赛ID
        p.inline-item.inline {{ $route.params.contest_id }}
    .block
        p.section-title.inline.same-width 比赛名称
        TextField.inline-item.inline(v-model:value="title", ref="title", style="width: 30em;")
    .block
        p.section-title.inline.same-width 赛制
        Selector.inline-item(:option="contestModeText", :current="mode", style="width: 10em;", ref="mode")
    .block
        p.section-title.inline.same-width 开始时间
        p.inline-item.inline {{ start_time }}
    .block
        p.section-title.inline.same-width 结束时间
        p.inline-item.inline {{ end_time }}
    p.section-title 比赛简介
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
            start_time: 0,
            end_time: 0,
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
                this.start_time = res.data.data.start_time;
                this.end_time = res.data.data.end_time;
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
                start_time: this.start_time,
                end_time: this.end_time,
                mode: this.$refs['mode'].getIndex(),
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
                        title: `提交成功`,
                        text: res.data.info
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
.card {
    position: relative;
}

.inline {
    display: inline-block !important;
    margin-bottom: 0;
}

.block {
    display: block;
}

.inline-item {
    position: relative;
    margin-bottom: -1em;
}

.title {
    font-weight: bold;
    margin: 0;
    font-size: 150%;
}

.section-title {
    font-weight: bold;
    font-size: 120%;
}

.section-subtitle {
    font-weight: bold;
    font-size: 100%;
    margin-bottom: 0.5em;
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

.sample {
    display: flex;
}

.sample-textarea {
    flex: 1;
    height: 100%;
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
