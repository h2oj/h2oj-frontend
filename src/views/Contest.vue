<template lang="pug">
Card.card-title
    p.title {{ title }}
    router-link(custom, v-slot="{ navigate }", :to="`/contest/${$route.params.contest_id}/edit`")
        FontAwesomeIcon(icon="wrench", @click="navigate").edit
Card.detail
    MarkdownView(:content="content")
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
    name: 'Contest',
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
            mode: 0,
            start_time: 0,
            end_time: 0,
            problem: []
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
                this.start_time = res.data.data.start_time;
                this.end_time = res.data.data.end_time;
                this.content = res.data.data.content;
                this.problem = res.data.data.problem;
            }
        });
    }
};
</script>

<style scoped>
.card-title {
    position: relative;
}

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
