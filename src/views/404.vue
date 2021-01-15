<template lang="pug">
.container
    p.text 服务器好像出去玩了~
    img.image(src="/static/cry.png")
</template>

<script>
export default {
    name: '404'
};
</script>

<style scoped>
.text {
    font-size: 120%;
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
