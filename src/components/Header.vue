<template lang="pug">
.topbar
    .topbar-left: p.topbar-title H<sub>2</sub> OJ
    .topbar-left
        ul.topbar-menubar
            li(onclick='window.location=\'/\'') 首页
            li(onclick='window.location=\'/problem\'') 题库
            li(onclick='window.location=\'/contest\'') 比赛
            li(onclick='window.location=\'/submission\'') 记录

    .topbar-right
        ul.topbar-menubar
            if nowUser
                li(onclick='window.location=\'/user\'')= nowUser.username
                li(onclick='window.location=\'/api/v1/logout\'') 退出
            else
                li(onclick='window.location=\'/login\'') 登录
    .topbar-user
        .topbar-avatar
</template>

<script>
export default {
    name: 'Header',
};
</script>

<style scoped>
.topbar {
    height: 50px;
    line-height: 50px;
    background-color: #293333;
    color: #f0f0f0;
    /* box-shadow: 0 0 5px 0px black; */
    font-size: 150%;
    font-weight: 100;
    font-family: 'microsoft yahei';
}

.topbar-left {
    float: left;
    height: 100%;
}

.topbar-right {
    float: right;
    height: 100%;
}

.topbar-title {
    display: inline-block;
    margin: 0em 1.5em;
    height: 100%;
}

.topbar-menubar {
    display: inline-block;
    margin: 0em;
    padding: 0em;
    height: 100%;
    font-size: 0.75em;
}

.topbar-menubar > li {
    list-style: none;
    float: left;
    height: calc(100% - 3px);
    line-height: 44px;
    min-width: 4em;
    text-align: center;
    transition-duration: 0.3s;
    border-top: transparent solid 3px;
    background-color: #293333;
}

.topbar-menubar > li:hover {
    border-top: #7c8cfc solid 3px;
    background-color: #111414;
}
</style>
