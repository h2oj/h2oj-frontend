<template lang="pug">
Card.title
    p.problem-title {{ $route.params.pid + '. ' + title }}
    .edit
        FontAwesomeIcon(icon="check", @click="update()")
        router-link(custom, v-slot="{ navigate }", :to="`/problem/${$route.params.pid}`")
            FontAwesomeIcon(icon="arrow-left", @click="back(navigate)")
Card.detail
    p.section-title.inline 题目名称
    TextField(v-model:value="title", ref="title").textfield.inline
    p.section-title 难度标签
    Selector()
    p.section-title 题目描述
    MarkdownEditor(v-model:content="content.description", ref="description")
    p.section-title 输入格式
    MarkdownEditor(v-model:content="content.input", ref="input")
    p.section-title 输出格式
    MarkdownEditor(v-model:content="content.output", ref="output")
    p.section-title 数据范围与提示
    MarkdownEditor(v-model:content="content.constraint", ref="constraint")
</template>

<script>
import Card from '../components/Card.vue';
import Tag from '../components/Tag.vue';
import Button from '../components/Button.vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import TextField from '../components/TextField.vue';
import Selector from '../components/Selector.vue';
import config from '../config';

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
            data: [],
            difficulty: ['尚未评定', '入门', '普及-', '普及/提高-', '普及+/提高', '提高+/省选-', '省选/NOI-', 'NOI/NOI+/CTSC']
        };
    },
    created: function () {
        let xhr = new XMLHttpRequest();
        xhr.open('get', `${config.apiServer}/problem/detail?pid=${this.$route.params.pid}`, false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                this.content = res.data.content;
                this.title = res.data.title;
            }
        };
        xhr.send();
    },
    methods: {
        update: function () {
            const xhr = new XMLHttpRequest();
            xhr.open('post', `${config.apiServer}/problem/update`, false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', this.$cookie.getCookie('hoj_token'));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    //const res = JSON.parse(xhr.responseText);
                }
            };
            console.log(this.content);
            xhr.send(JSON.stringify({
                pid: this.$route.params.pid,
                difficulty: 0,
                content: this.content
            }));
        },
        back: function (navigate) {
            this.update();
            navigate();
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

.textfield {
    position: relative;
    margin-bottom: -1em;
    top: -0.2em;
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
