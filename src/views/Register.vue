<template lang="pug">
Card
    p.index-title 注册
    TextField#regusername.center(placeholder="用户名", ref="regusername")
    TextField#regemail.center(placeholder="邮箱", ref="regemail")
    TextField#regpassword.center(placeholder="密码", ref="regpassword", type="password")
    TextField#regpasswordagain.center(placeholder="请再次输入密码", ref="regpasswordagain", type="password")
    Button.login-button(@click="login()", text="登录")
    p 已经有账户了？去#[a(href="/login") 登录]
</template>

<script>
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import TextField from '../components/TextField';
import config from '../config';

export default {
    name: 'Register',
    components: {
        Card,
        TextField,
        Button
    },
    methods: {
        login: function () {
            const username = document.getElementById("regusername").value;
            const password = document.getElementById("regpassword").value;
            const passwordagain = document.getElementById("regpasswordagain").value;
            const email = document.getElementById("regemail").value;
            if(password!=passwordagain){
                window.swal("密码错误" ,  "您两次输入的密码不一致！" ,  "error");
                return;
            }
            const xhr = new XMLHttpRequest();
            xhr.open('post', `${config.apiServer}/auth/signup`, false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    if(res.status === 422){
                        window.swal("不合法的邮箱或用户名" ,  "用户名中只能包含大小写字母、数字或下划线，且仅能以字母开头。" ,  "error");
                        return;
                    }
                    if(res.status === 1001 || res.status === 1002){
                        window.swal("错误" ,  "邮箱或用户名已被注册。" ,  "error");
                        return;
                    }
                    if(res.status === 500){
                        window.swal("错误" ,  "未知服务器错误。" ,  "error");
                        return;
                    }
                    if(res.status === 200){
                        window.location="/login";
                    }
                }
                if(xhr.status === 422){
                    window.swal("错误" ,  "不合法的邮箱或用户名或用户已存在" ,  "error");
                    return;
                }
            };
            xhr.send('{"username":"'+username+'","password":"'+password+'","email":"'+email+'"}');
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
