<template lang="pug">
.monaco-editor(ref="monaco-editor")
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
    name: 'MonacoEditor',
    props: {
        content: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            editor: null
        };
    },
    mounted: function () {
        this.editor = monaco.editor.create(this.$refs['monaco-editor'], {
            value: [
                'int main() {',
                '    return 0;',
                '}'
            ].join('\n'),
            language: 'cpp'
        });
    }
};
</script>

<style scoped>
</style>
