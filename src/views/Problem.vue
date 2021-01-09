<template lang="pug">
Card.title
    p.problem-title {{ $route.params.pid + '. ' + title }}
    router-link(custom, v-slot="{ navigate }", :to="`/problem/${$route.params.pid}/edit`")
        FontAwesomeIcon(icon="wrench", @click="navigate").edit
Card.detail
    template(v-if="content.description")
        p.section-title 题目描述
        MarkdownView(:content="content.description")
    template(v-if="content.input")
        p.section-title 输入格式
        MarkdownView(:content="content.input")
    template(v-if="content.output")
        p.section-title 输出格式
        MarkdownView(:content="content.output")
    template(v-if="content.constraint")
        p.section-title 数据范围与提示
        MarkdownView(:content="content.constraint")
Card
<<<<<<< HEAD
    p 提交答案
    MonacoEditor.editor
=======
    MonacoEditor.editor(ref="monaco")
    Button(text="提交", @click="sumbitCode()")
>>>>>>> upstream/main
</template>

<script>
import Card from '../components/Card.vue';
import Tag from '../components/Tag.vue';
import Button from '../components/Button.vue';
import MarkdownView from '../components/MarkdownView.vue';
import MonacoEditor from '../components/MonacoEditor.vue';
import config from '../config';

export default {
    name: 'Problem',
    components: {
        Card,
        Tag,
        Button,
        MarkdownView,
        MonacoEditor
    },
    data: function () {
        return {
            title: '',
            content: '',
            data: [],
            difficulty: ['尚未评定', '入门', '普及-', '普及/提高-', '普及+/提高', '提高+/省选-', '省选/NOI-', 'NOI/NOI+/CTSC']
        };
    },
    created: function() {
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
        sumbitCode() {
            //console.log(this.$refs['monaco']);
            let xhr = new XMLHttpRequest();
            xhr.open('post', `${config.apiServer}/submission/submit`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    console.log(res);
                }
            };
            xhr.send(JSON.stringify({
                pid: this.$route.params.pid,
                language: 'cpp98',
                code: this.$refs['monaco'].getInstance().getValue()
            }));
        }
    }
};
</script>

<style scoped>
.title {
    position: relative;
}

.problem-title {
    font-weight: 400;
    margin: 0;
    font-size: 150%;
}

.problem-id {
    font-size:25%;
    font-weight: 100;
    color:gray;
    margin: 0;
}

.detail {
    text-align: left;
}

.section-title {
    font-weight: 550;
    font-size: 125%;
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
    transition-delay: 0.3s;
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
