<template lang="pug">
.topbar
    .topbar-left: p.topbar-title H<sub>2</sub> OJ
    .topbar-left
        ul.topbar-menubar
            router-link(custom, v-slot="{ navigate }", to="/", :class="{'selected': selected === 1}")
                li(role="link", @click="onItemSelect(1, navigate)") 首页
            router-link(custom, v-slot="{ navigate }", to="/problem", :class="{'selected': selected === 2}")
                li(role="link", @click="onItemSelect(2, navigate)") 题库
            router-link(custom, v-slot="{ navigate }", to="/contest", :class="{'selected': selected === 3}")
                li(role="link", @click="onItemSelect(3, navigate)") 比赛
            router-link(custom, v-slot="{ navigate }", to="/submission", :class="{'selected': selected === 4}")
                li(role="link", @click="onItemSelect(4, navigate)") 记录
    .topbar-right
        ul.topbar-menubar
<<<<<<< HEAD
            template(v-if="isLogin()")
                router-link(custom, v-slot="{ navigate }", to="/user", :class="{'selected': selected === -1}")
                    li#topbarUsername.topbar-username(role="link", @click="select(-1, navigate)") 
=======
            template(v-if="loginState")
                router-link(custom, v-slot="{ navigate }", :to="`/user/${uid}`", :class="{'selected': selected === -1}")
                    li(role="link", @click="onItemSelect(-1, navigate)") {{ nickname }}
>>>>>>> upstream/main
                router-link(custom, v-slot="{ navigate }", to="/", :class="{'selected': selected === -2}")
                    li(role="link", @click="handleLogout(); onItemSelect(1, navigate)") 登出
            template(v-else)
                router-link(custom, v-slot="{ navigate }", to="/login", :class="{'selected': selected === -1}")
                    li(role="link", @click="onItemSelect(-1, navigate)") 登录
    .topbar-user
        .topbar-avatar
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
            username: '',
            nickname: ''
        };
    },
    mounted: function () {
        if(this.$cookie.getCookie('hoj_username') != undefined){
            document.getElementById("topbarUsername").innerHTML=this.$cookie.getCookie('hoj_username');
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
            this.username = data.username;
            this.nickname = data.nickname;
        },
<<<<<<< HEAD
        logout: function () {
            this.$cookie.removeCookie('hoj_token');
            this.$cookie.removeCookie('hoj_username');
=======
        handleLogout: function () {
            this.loginState = false;
            axios.post(`${config.apiServer}/problem/update`, {
                pid: this.$route.params.pid,
                title: this.title,
                difficulty: this.$refs['difficulty'].getIndex(),
                content: this.content
            }, {
                headers: {
                    'Authorization': this.$cookie.getCookie('hoj_token')
                }
            }).then(res => {
                if (res.data.status == 200) {
                    this.$cookie.removeCookie('hoj_token');
                    this.$cookie.removeCookie('hoj_uid');
                }
                else {
                    this.$swal.fire({
                        icon: 'error',
                        title: `Error: ${res.data.status}`,
                        text: res.data.info
                    });
                }
            });
>>>>>>> upstream/main
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
</style>
