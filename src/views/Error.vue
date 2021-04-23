<template lang="pug">
.container
    p.text(style="margin-top: 3em;") 服务器好像出去玩了~
    p.text 错误代码：{{ $route.params.error_code }}。但我觉得那没有什么用。 
    img.image(src="/static/cry.png")
</template>

<script>
export default {
    name: 'Error'
};
</script>

<style scoped>
.text {
    font-size: 110%;
    text-align: center;
}

.small {
    font-size: 1%;
    margin-top: 4em;
    text-align: center;
}

.image {
    margin-left: auto;
    margin-right: auto;
    width: 15em;
    display: block;
}
</style>
