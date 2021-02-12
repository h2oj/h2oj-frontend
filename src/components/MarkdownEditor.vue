<template lang="pug">
.markdown-editor
    TextArea(v-model="content").markdown-editor-textarea.scrollbar
    MarkdownView(:content="content").markdown-editor-view.scrollbar
</template>

<script>
import TextArea from './TextArea.vue';
import MarkdownView from './MarkdownView.vue';
import '../static/scrollbar.css';

export default {
    name: 'MarkdownEditor',
    components: {
        TextArea,
        MarkdownView
    },
    props: {
        content: {
            type: String,
            default: ''
        }
    },
    watch: {
        content: function () {
            console.log(this.content);
            this.$emit('update:content', this.content);
        }
    },
    methods: {
        value: function () {
            return this.content;
        }
    }
};
</script>

<style scoped>
.markdown-editor {
    display: flex;
    flex-direction: row;
    height: 200px;
}

.markdown-editor-textarea {
    flex: 1;
    height: 100%;
    overflow-y: auto;
}

.markdown-editor-view {
    height: 100%;
    padding: 0.5em;
    flex: 1;
    border: 1px solid #aaaaaa;
    border-left: none;
    box-sizing: border-box;
    overflow-y: auto;
}
</style>
