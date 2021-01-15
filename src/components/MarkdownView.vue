<template lang="pug">
.markdown-view(ref="markdown-view")
</template>

<script>
import MarkdownIt from 'markdown-it';
import MarkdownItKatex from 'markdown-it-katex';
import 'github-markdown-css';
import 'katex/dist/katex.min.css';

export default {
    name: 'MarkdownView',
    props: {
        content: {
            type: String,
            default: ''
        }
    },
    data: function () {
        const md = new MarkdownIt();
        md.use(MarkdownItKatex);
        return {
            md: md
        };
    },
    watch: {
        content: {
            immediate: true,
            handler: function (val) {
                this.$nextTick(() => {
                    this.$refs['markdown-view'].innerHTML = this.md.render(val);
                });
            }
        }
    }
};
</script>

<style>
.markdown-view * {
    max-width: 100%;
    position: relative;
}
</style>
