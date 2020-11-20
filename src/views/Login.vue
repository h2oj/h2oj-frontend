<template lang="pug">
Card
    TextField(placeholder="用户名 / 邮箱")
    TextField(placeholder="密码")
    Button(text="登录")
</template>

<script>
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import TextField from '../components/TextField';

export default {
    name: 'Login',
    components: {
        Card,
        TextField,
        Button
    },
    methods: {
        hitokoto: function () {
            let xhr = new XMLHttpRequest();
            xhr.open('get', 'https://v1.hitokoto.cn/?c=k&c=d&encode=json', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const res = JSON.parse(xhr.responseText);
                    document.getElementById('hitokoto').innerHTML = `「${res.hitokoto}」 －${res.from}`;
                }
            };
            xhr.send();
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
    font-weight: bold;
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}

.index-info { 
    font-size: 15px;
    margin-bottom: 5px !important;
}
</style>
