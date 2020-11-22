<template lang="pug">
Card
    p.index-title 登录
    TextField#username.center(placeholder="用户名 / 邮箱", ref="username")
    TextField#password.center(placeholder="密码", ref="password", type="password")
    Button.login-button(@click="login()", text="登录")
    p 没有帐号？#[a(href="/register") 注册]
</template>

<script>
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import TextField from '../components/TextField';
import config from '../config';

export default {
    name: 'Login',
    components: {
        Card,
        TextField,
        Button
    },
    methods: {
        login: function () {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const xhr = new XMLHttpRequest();
            xhr.open('post', `${config.apiServer}/auth/signin`, false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    if(res.status === 1003 || res.status === 422){
                        window.swal("错误" ,  "用户名或密码错误" ,  "error");
                        return;
                    }
                    this.$cookie.setCookie('hoj_token', res.data.token);
                    this.$cookie.setCookie('hoj_username', username);
                    window.location="/";
                }
            };
            xhr.send(JSON.stringify({
                username: username,
                password: password
            }));
        }
    }
};
</script>

<style>
.index-main { 
    display: flex;
    justify-content: space-around;
    align-items: center;
    justify-content: space-around;
}

.index-card {
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: auto !important;
    min-width: 50%;
}

.index-card-space {
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
}

.index-hitokoto {
    min-width: 30% !important;
    max-width: 50% !important;
}

.index-title {
    font-size: 25px;
    font-weight: 200;
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}

.index-info { 
    font-size: 15px;
    margin-bottom: 5px !important;
}

.login-button{
    margin-top:10px;
}

.center {
    text-align:center;
    margin:auto;
}

a {
    text-decoration: none;
    color: #2f8bc9;
    transition: color 0.25s;
}
a:hover {
    color: #1b4f72;
}
a:active {
    text-decoration: none;
}
a:visited{
    text-decoration: none;
}
</style>
