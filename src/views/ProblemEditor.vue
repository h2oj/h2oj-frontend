<template lang="pug">
Card(style="position: relative;")
    p.no-margin.title {{ $route.params.pid + '. ' + title }}
    .edit
        FontAwesomeIcon(icon="check", @click="update()")
        router-link(custom, v-slot="{ navigate }", :to="`/problem/${$route.params.pid}`")
            FontAwesomeIcon(icon="arrow-left", @click="back(navigate)")
Card.detail
    .block
        p.section-subtitle.inline-block.same-width 题目ID
        p.inline-block {{ $route.params.pid }}
    .block
        p.section-subtitle.inline-block.same-width 题目名称
        el-input(v-model="title", style="width: 32em;")
    .block
        p.section-subtitle.inline-block.same-width 难度标签
        el-select(v-model="data.difficulty")
            el-option(v-for="(item, index) in difficultyText", :value="index", :label="item")
    p.section-subtitle 题目描述
    MarkdownEditor(v-model:content="content.description", ref="description")
    p.section-subtitle 输入格式
    MarkdownEditor(v-model:content="content.input", ref="input")
    p.section-subtitle 输出格式
    MarkdownEditor(v-model:content="content.output", ref="output")
    p.section-subtitle 数据范围与提示
    MarkdownEditor(v-model:content="content.constraint", ref="constraint")
    .block
        p.section-subtitle.inline-block(style="padding-right: 0.5em; margin-bottom: 0;") 样例数据
        FontAwesomeIcon(icon="plus", @click="addSample()")
    template(v-for="(item, index) in sample")
        .block
            p.section-subtitle.inline-block(style="padding-right: 0.5em;") 样例 \#{{ index + 1 }}
            FontAwesomeIcon(icon="times", @click="deleteSample($event, index)")
        .sample
            TextArea.sample-textarea.scrollbar(v-model="sample[index].input", style="margin-right: 0.5em;")
            TextArea.sample-textarea.scrollbar(v-model="sample[index].output")
    p.section-subtitle 测试数据
    Button(value="上传", @click="uploadData()")
    Button(value="下载", @click="downloadData()")
    p.detail 题目数据应以zip格式上传，具体要求请见 数据上传要求
</template>

<script>
import Card from '../components/Card.vue';
import Tag from '../components/Tag.vue';
import Button from '../components/Button.vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import TextField from '../components/TextField.vue';
import Selector from '../components/Selector.vue';
import TextArea from '../components/TextArea.vue';
import config from '../config';
import { difficultyText } from '../const';
import axios from 'axios';
import '../static/scrollbar.css';

export default {
    name: 'ProblemEditor',
    components: {
        Card,
        Tag,
        Button,
        MarkdownEditor,
        TextField,
        Selector,
        TextArea
    },
    data: function () {
        return {
            title: '',
            content: {},
            data: {},
            sample: []
        };
    },
    created: async function () {
        this.difficultyText = difficultyText;
        
        await axios.get(`${config.apiServer}/problem/detail`, {
            params: {
                pid: this.$route.params.pid
            }
        }).then(res => {
            this.data = res.data.data;
            this.content = res.data.data.content;
            this.title = res.data.data.title;
            this.sample = res.data.data.sample;
        });
    },
    methods: {
        update: function () {
            axios.post(`${config.apiServer}/problem/update`, {
                pid: this.$route.params.pid,
                title: this.title,
                difficulty: this.data.difficulty,
                content: this.content,
                sample: this.sample
            }, {
                headers: {
                    'Authorization': this.$cookie.getCookie('token')
                }
            }).then(res => {
                this.data = res.data.data;
                this.content = res.data.data.content;
                this.title = res.data.data.title;
                this.sample = res.data.data.sample;
            });
        },
        back: function (navigate) {
            this.update();
            navigate();
        },
        uploadData: function () {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', '.zip');
            input.onchange = event => {
                let formData = new FormData();
                formData.append('pid', this.$route.params.pid);
                formData.append('data', event.target.files[0]);
                axios.post(`${config.apiServer}/problem/upload_data`, formData, {
                    headers: {
                        'Authorization': this.$cookie.getCookie('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res);
                });
            };
            input.click();
        },
        downloadData: function () {
            axios.post(`${config.apiServer}/problem/download_data`, {
                pid: this.$route.params.pid
            }, {
                headers: {
                    'Authorization': this.$cookie.getCookie('token')
                },
                responseType: 'blob'
            }).then(res => {
                const blob = new Blob([res.data], { type: 'application/octet-stream' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob)
                link.setAttribute('download', 'data.zip');
                link.click();
            });
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
