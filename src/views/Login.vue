<template lang="pug">
Card
    TextField(placeholder="用户名 / 邮箱", ref="username")
    TextField(placeholder="密码", ref="password")
    Button(@click="login()", text="登录")
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
            const username = this.$refs['username'].value;
            const password = this.$refs['password'].value;

            const xhr = new XMLHttpRequest();
            xhr.open('post', `${config.apiServer}/auth/signin`, false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const res = JSON.parse(xhr.responseText);
                    if (xhr.status === 200) {
                        if (res.status == 200) {
                            this.$cookie.setCookie('hoj_token', res.data.token);
                            this.$router.push('/');
                        }
                        else {
                            this.$swal.fire({
                                icon: 'error',
                                title: `Error: ${res.status}`,
                                text: res.info
                            });
                        }
                    }
                    else {
                        this.$swal.fire({
                            icon: 'error',
                            title: `Server Error: ${res.status}`,
                            text: res.info
                        });
                    }
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

<style scoped>
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
</style>
