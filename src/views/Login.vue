<template lang="pug">
Card.card
    TextField.center(placeholder="用户名", ref="username")
    TextField.center(v-if="!isSignIn", placeholder="邮箱", ref="email")
    TextField.center(placeholder="密码", ref="password", password)
    TextField.center(v-if="!isSignIn", placeholder="重复密码", ref="repassword", password)
    TextField.center(v-if="!isSignIn", placeholder="请输入下方的分子式", title="例：C6H12O6", ref="captcha")
    img.captcha.center(v-if="!isSignIn", :src="captcha", @click="requestNewCaptcha()")
    .center
        Button.space-after.button(@click="handleSubmit()", :text="isSignIn ? '登录' : '注册'", ref="signin")
        a.text(@click="handleChangeState()", :text="isSignIn ? '没有账号?' : '已有账号?'", ref="signup")
    a.text(@click="handleOAuthGithub()", text="GitHub")
</template>

<script>
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import TextField from '../components/TextField';
import config from '../config';
import axios from 'axios';
import { Base64 } from 'js-base64';

export default {
    name: 'Login',
    components: {
        Card,
        TextField,
        Button
    },
    data: function () {
        return {
            isSignIn: true,
            captcha: '',
            captchaToken: ''
        };
    },
    created: function () {
        this.requestNewCaptcha();
    },
    updated: function () {
        if (this.$route.query.signup) {
            this.isSignIn = false;
        }
        else {
            this.isSignIn = true;
        }
    },
    methods: {
        requestNewCaptcha: function () {
            axios.get(`${config.apiServer}/captcha/get`).then(res => {
                if (res.data.status === 200) {
                    this.captcha = 'data:image/svg+xml;base64,' + Base64.encode(res.data.data.data);
                    this.captchaToken = res.data.data.token;
                }
            });
        },
        handleSignIn: function () {
            axios.post(`${config.apiServer}/auth/signin`, {
                username: this.$refs['username'].value,
                password: this.$refs['password'].value
            }).then(res => {
                if (res.data.status === 200) {
                    this.$cookie.setCookie('token', res.data.data.token);
                    localStorage.setItem('user_id', res.data.data.user_id);
                    localStorage.setItem('nickname', res.data.data.nickname);
                    localStorage.setItem('avatar', res.data.data.avatar);
                    localStorage.setItem('role_id', res.data.data.role_id);
                    this.$router.push('/');
                    this.$emit('login', res.data.data);
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
        handleSubmit: function () {
            if (this.isSignIn) {
                this.handleSignIn();
            }
            else {
                axios.post(`${config.apiServer}/captcha/verify`, {
                    code: this.$refs['captcha'].value
                }, {
                    headers: {
                        'Authorization': this.captchaToken
                    }
                }).then(res => {
                    if (res.data.status == 200) {
                        axios.post(`${config.apiServer}/auth/signup`, {
                            username: this.$refs['username'].value,
                            nickname: this.$refs['username'].value,
                            email: this.$refs['email'].value,
                            password: this.$refs['password'].value
                        }, {
                            headers: {
                                'Authorization': res.data.data.token
                            }
                        }).then(res => {
                            if (res.data.status == 200) {
                                this.handleSignIn();
                            }
                            else {
                                this.$swal.fire({
                                    icon: 'error',
                                    title: `Error: ${res.data.status}`,
                                    text: res.data.info
                                });
                            }
                        });
                    }
                });
            }
        },
        handleChangeState: function () {
            this.isSignIn = !this.isSignIn;
        },
        handleOAuthGithub: function () {
            window.open(`https://github.com/login/oauth/authorize?client_id=${config.githubClientId}`);
        }
    }
};
</script>

<style scoped>
.card {
    width: fit-content;
}

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
    font-weight: bold;
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}

.index-info { 
    font-size: 15px;
    margin-bottom: 5px !important;
}

.button {
    margin-top: 1em;
    width: 5em;
}

.center {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

.space-after {
    margin-right: 1em;
}

.text {
    font-size: 80%;
}

.captcha {
    width: 10em;
    margin: 1em auto;
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
