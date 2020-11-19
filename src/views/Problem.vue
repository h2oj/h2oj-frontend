<template lang="pug">
Card
    p.title {{ $route.params.pid + '. ' + title }}
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
    p IDE Area
    MonacoEditor.editor
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
        search: function () {
            let search = document.getElementById('search-input').value;
            let xhr = new XMLHttpRequest();
            xhr.open('get', `${config.apiServer}/problem/list?page=${1}&search=${search}`, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    this.curPage = 1;
                    this.data = res.data.problems;
                    this.pageCount = res.data.page_count;
                }
            };
            xhr.send();
        }
    }
};
</script>

<style scoped>
.title {
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
