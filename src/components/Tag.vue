<template lang="pug">
.tag {{text}}
</template>

<script>
export default {
    name: 'Tag',
    props: {
        text: String
    }
}
</script>

<style scoped>
.tag {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 2px;
    color: #ffffff;
    font-size: 13px;
    line-height: 13px;
    font-weight: 400;
    margin-left: 5px;
    background-color: #bfbfbf;
}
</style>
