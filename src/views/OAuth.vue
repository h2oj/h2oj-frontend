<template lang="pug">
p 登录中...
</template>

<script>
import axios from 'axios';
import config from '../config';

export default {
    name: 'OAuth',
    created: async function () {
        let res = await axios.post(`${config.apiServer}/oauth/${this.$route.params.platform}`, {
            code: this.$route.query.code
        });
        if (res.status !== 200) this.$router.push(`/error/${res.status}`);
        else if (res.data.status !== 200) this.$router.push(`/error/${res.data.status}`)
        else {
            const data = res.data.data;
            this.$cookie.setCookie('token', data.token);
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('nickname', data.nickname);
            localStorage.setItem('avatar', data.avatar);
            localStorage.setItem('role_id', data.role_id);
            this.$router.push('/');
            this.$emit('login', res.data.data);
        }
    }
};
</script>

<style>
</style>
