<template lang="pug">
Card.title
    p.problem-title {{ $route.params.pid + '. ' + title }}
    .edit
        FontAwesomeIcon(icon="check", @click="update()")
        router-link(custom, v-slot="{ navigate }", :to="`/problem/${$route.params.pid}`")
            FontAwesomeIcon(icon="arrow-left", @click="back(navigate)")
Card.detail
    .block
        p.section-title.inline 题目名称
        TextField.inline-item.inline(v-model:value="title", ref="title")
    .block
        p.section-title.inline 难度标签
        Selector.inline-item(:option="difficultyText", :current="data.difficulty", style="width: 10em;", ref="difficulty")
    p.section-title 题目描述
    MarkdownEditor(v-model:content="content.description", ref="description")
    p.section-title 输入格式
    MarkdownEditor(v-model:content="content.input", ref="input")
    p.section-title 输出格式
    MarkdownEditor(v-model:content="content.output", ref="output")
    p.section-title 数据范围与提示
    MarkdownEditor(v-model:content="content.constraint", ref="constraint")
    p.section-title 样例数据
    p.section-title 题目数据
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
import config from '../config';
import { difficultyText } from '../const';
import axios from 'axios';

export default {
    name: 'ProblemEditor',
    components: {
        Card,
        Tag,
        Button,
        MarkdownEditor,
        TextField,
        Selector
    },
    data: function () {
        return {
            title: '',
            content: {},
            data: {}
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
        });
    },
    methods: {
        update: function () {
            axios.post(`${config.apiServer}/problem/update`, {
                pid: this.$route.params.pid,
                title: this.title,
                difficulty: this.$refs['difficulty'].getIndex(),
                content: this.content
            }, {
                headers: {
                    'Authorization': this.$cookie.getCookie('hoj_token')
                }
            }).then(res => {
                this.data = res.data.data;
                this.content = res.data.data.content;
                this.title = res.data.data.title;
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
                        'Authorization': this.$cookie.getCookie('hoj_token'),
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res);
                });
            };
            input.click();
        },
        downloadData: function () {
            
        }
    }
};
</script>

<style scoped>
.title {
    position: relative;
}

.inline {
    display: inline-block !important;
    margin-right: 1em;
    margin-bottom: 0;
}

.block {
    display: block;
}

.inline-item {
    position: relative;
    margin-bottom: -1em;
}

.problem-title {
    font-weight: bold;
    margin: 0;
    font-size: 150%;
}

.detail {
    text-align: left;
}

.section-title {
    font-weight: bold;
    font-size: 120%;
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
