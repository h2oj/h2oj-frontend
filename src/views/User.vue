<template lang="pug">
Card.info
    .info-left
        img.avatar(:src="avatar")
    .info-right
        p {{ nickname }}
        p {{ description }}
Card
    MarkdownView(:content="information")
</template>

<script>
import Card from '../components/Card.vue';
import MarkdownView from '../components/MarkdownView.vue';
import config from '../config';
import axios from 'axios';

export default {
    name: 'Index',
    components: {
        Card,
        MarkdownView
    },
    data: function () {
        return {
            avatar: '',
            nickname: ''
        };
    },
    created: async function () {
        await axios.get(`${config.apiServer}/user/detail`, {
            params: {
                uid: this.$route.params.uid
            }
        }).then(res => {
            this.nickname = res.data.data.nickname;
            this.avatar = res.data.data.avatar;
            this.description = res.data.data.description;
            this.information = res.data.data.information;
            // this.rating = res.data.data.rating;
        });
    }
};
</script>

<style scoped>
p {
    margin: 0;
    text-align: left;
}

.info {
    display: flex;
}

.info-left {
    width: 5em;
}

.avatar {
    width: 5em;
    height: 5em;
}
</style>
