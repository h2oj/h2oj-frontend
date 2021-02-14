<template lang="pug">
Card(style="position: relative;")
    p.title.no-margin {{ $route.params.pid + '. ' + title }}
    router-link(custom, v-slot="{ navigate }", :to="`/problem/${$route.params.pid}/edit`")
        FontAwesomeIcon(icon="wrench", @click="navigate").edit
Card.detail
    template(v-if="content.description")
        p.section-title(style="margin-top: 0;") 题目描述
        MarkdownView(:content="content.description")
    template(v-if="content.input")
        p.section-title 输入格式
        MarkdownView(:content="content.input")
    template(v-if="content.output")
        p.section-title 输出格式
        MarkdownView(:content="content.output")
    template(v-if="sample.length > 0")
        p.section-title 输入输出样例
        template(v-for="(item, index) in sample")
            p.section-subtitle 样例 \#{{ index + 1}}
            .sample-text
                pre(style="margin-right: 1em;") {{ item.input }}
                pre {{ item.output }}
    template(v-if="content.constraint")
        p.section-title 数据范围与提示
        MarkdownView(:content="content.constraint")
Card
    MonacoEditor.editor(ref="monaco")
    Button(text="提交", @click="sumbitCode()")
</template>

<script>
import Card from '../components/Card.vue';
import Tag from '../components/Tag.vue';
import Button from '../components/Button.vue';
import MarkdownView from '../components/MarkdownView.vue';
import MonacoEditor from '../components/MonacoEditor.vue';
import config from '../config';
import axios from 'axios';

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
            content: {},
            data: [],
            difficulty: ['尚未评定', '入门', '普及-', '普及/提高-', '普及+/提高', '提高+/省选-', '省选/NOI-', 'NOI/NOI+/CTSC'],
            sample: []
        };
    },
    created: async function () {
        await axios.get(`${config.apiServer}/problem/detail?pid=${this.$route.params.pid}`).then(res => {
            if (res.status === 200) {
                const { data } = res
                this.content = data.data.content;
                this.title = data.data.title;
                this.sample = data.data.sample;
            }
        });
    },
    methods: {
        sumbitCode() {
            //console.log(this.$refs['monaco']);
            axios.post(`${config.apiServer}/submission/submit`, {
                pid: this.$route.params.pid,
                language: 'cpp98',
                code: this.$refs['monaco'].getInstance().getValue()
            }, {
                headers: {
                    'Authorization': this.$cookie.getCookie('token')
                }
            }).then(res => {
                if (res.data.status === 200) {
                    this.$swal.fire({
                        icon: 'success',
                        title: `提交成功`,
                        text: res.data.info
                    });
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: `提交失败`,
                        text: res.data.info
                    });
                }
        });
        }
    }
};
</script>

<style scoped>
@import '~@/static/article.css';

.title {
    position: relative;
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

.section-subtitle {
    font-weight: bold;
    font-size: 100%;
    margin-bottom: 0.5em;
}

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
