<template lang="pug">
.topbar
    .topbar-left: p(@click="backToIndex()").topbar-title H<sub>2</sub> OJ
    .topbar-left
        ul.topbar-menubar
            router-link(custom, v-slot="{ navigate }", to="/", :class="{'selected': selected === 1}")
                li(role="link", @click="select(1, navigate)") 首页
            router-link(custom, v-slot="{ navigate }", to="/problem", :class="{'selected': selected === 2}")
                li(role="link", @click="select(2, navigate)") 题库
            router-link(custom, v-slot="{ navigate }", to="/contest", :class="{'selected': selected === 3}")
                li(role="link", @click="select(3, navigate)") 比赛
            router-link(custom, v-slot="{ navigate }", to="/submission", :class="{'selected': selected === 4}")
                li(role="link", @click="select(4, navigate)") 记录
    .topbar-right
        ul.topbar-menubar
            template(v-if="isLogin()")
                router-link(custom, v-slot="{ navigate }", to="/user", :class="{'selected': selected === -1}")
                    li(role="link", @click="select(-1, navigate)") 111
                router-link(custom, v-slot="{ navigate }", to="/", :class="{'selected': selected === -2}")
                    li(role="link", @click="logout(); select(1, navigate)") 登出
            template(v-else)
                router-link(custom, v-slot="{ navigate }", to="/login", :class="{'selected': selected === -1}")
                    li(role="link", @click="select(-1, navigate)") 登录
    .topbar-user
        .topbar-avatar
</template>

<script>
export default {
    name: 'Header',
    data: function () {
        return {
            selected: 0
        };
    },
    methods: {
        select: function (id, navigate) {
            this.selected = id;
            navigate();
        },
        backToIndex: function(){
            window.location.href="/";
        },
        isLogin: function () {
            return this.$cookie.getCookie('hoj_token');
        },
        logout: function () {
            this.$cookie.removeCookie('hoj_token');
        }
    }
};
</script>

<style scoped>
.topbar {
    position: sticky;
    z-index: 1;
    top: 0px;
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

.selected {
    border-top: #7c8cfc solid 3px !important;
    background-color: #111414 !important;
}
</style>
