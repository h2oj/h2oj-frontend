<template lang="pug">
.topbar
    div
        p.topbar-title H<sub>2</sub> OJ
    div(style="flex: 1; height: 100%;")
        ul.topbar-menubar
            router-link(custom, v-slot="{ navigate }", to="/", :class="{'selected': selected === 1}")
                li(role="link", @click="onItemSelect(1, navigate)") 首页
            router-link(custom, v-slot="{ navigate }", to="/problem", :class="{'selected': selected === 2}")
                li(role="link", @click="onItemSelect(2, navigate)") 题库
            router-link(custom, v-slot="{ navigate }", to="/contest", :class="{'selected': selected === 3}")
                li(role="link", @click="onItemSelect(3, navigate)") 比赛
            router-link(custom, v-slot="{ navigate }", to="/submission", :class="{'selected': selected === 4}")
                li(role="link", @click="onItemSelect(4, navigate)") 记录
    template(v-if="loginState")
        div
            .avatar-div(@mouseenter="handleChangeShow()", @mouseleave="handleChangeShow()")
                router-link(custom, v-slot="{ navigate }", :to="`/user/${uid}`")
                    img.avatar(role="link", :src="avatar", @click="onItemSelect(-1, navigate)")
                .user-panel(:class="{'hidden': !show}")
                    p.user-name {{ nickname }}
                    ul.user-list
                        router-link(custom, v-slot="{ navigate }", to="/user/settings")
                            li(role="link", @click="onItemSelect(-1, navigate)") 账号设置
                        router-link(custom, v-slot="{ navigate }", to="/")
                            li(role="link", @click="handleLogout(); onItemSelect(-1, navigate)") 退出
    template(v-else)
        .login
            router-link(custom, v-slot="{ navigate }", to="/login")
                li(role="link", @click="onItemSelect(-1, navigate)") 登录
            router-link(custom, v-slot="{ navigate }", to="/register")
                li(role="link", @click="onItemSelect(-1, navigate)") 注册
</template>

<script>
import config from '../config';
import axios from 'axios';

export default {
    name: 'Header',
    data: function () {
        return {
            selected: 0,
            loginState: false,
            uid: 0,
            nickname: '',
            avatar: '',
            show: false
        };
    },
    created: function () {
        if (this.$cookie.getCookie('hoj_token')) {
            this.loginState = true;
            this.uid = this.$cookie.getCookie('hoj_uid');
            this.nickname = this.$cookie.getCookie('hoj_nickname');
            this.avatar = this.$cookie.getCookie('hoj_avatar');
        }
    },
    methods: {
        onItemSelect: function (id, navigate) {
            this.selected = id;
            navigate();
        },
        handleLogin: function (data) {
            this.loginState = true;
            this.uid = data.uid;
            this.nickname = data.nickname;
        },
        handleLogout: function () {
            this.loginState = false;
            axios.get(`${config.apiServer}/auth/signout`, {
                headers: {
                    'Authorization': this.$cookie.getCookie('hoj_token')
                }
            }).then(res => {
                if (res.data.status == 200) {
                    this.$cookie.removeCookie('hoj_token');
                    this.$cookie.removeCookie('hoj_uid');
                    this.$cookie.removeCookie('hoj_nickname');
                    this.$cookie.removeCookie('hoj_avatar');
                }
                else {
                    this.$swal.fire({
                        icon: 'error',
                        title: `Error: ${res.data.status}`,
                        text: res.data.info
                    });
                }
            });
        },
        handleChangeShow: function () {
            this.show = !this.show;
        }
    }
};
</script>

<style scoped>
.topbar {
    display: flex;
    position: sticky;
    z-index: 1;
    top: 0px;
    height: 50px;
    background-color: #293333;
    color: #f0f0f0;
    /* box-shadow: 0 0 5px 0px black; */
    font-size: 150%;
    font-weight: 100;
    font-family: 'microsoft yahei';
    align-items: center;
}

.topbar-title {
    display: inline-block;
    margin: 0em 1.5em;
    height: 1em;
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
    height: 100%;
    padding: 0 1em;
    box-sizing: border-box;
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

.avatar-div {
    margin-right: 1em;
    height: 1.5em;
}

.avatar {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
}

.user-panel {
    opacity: 1;
    position: fixed;
    width: 5em;
    right: 0.5em;
    padding: 0.5em;
    background-color: #ffffff;
    color: #2c3e50;
    transition: 0.3s ease all;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
}

.hidden {
    visibility: hidden;
    opacity: 0;
}

.user-list {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 65%;
    line-height: 1.5em;
}

.user-list > li:hover {
    color: #000000;
}

.user-name {
    font-size: 65%;
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 0.2em;
}

.login {
    font-size: 65%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    margin-right: 1em;
}

.login > li {
    margin: 0 0.5em;
}
</style>
