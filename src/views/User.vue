<template lang="pug">
Card.info
    .info-left
        img.avatar(:src="avatar")
    .info-right
        p.nickname {{ nickname }}
        p.description {{ description }}
Card
    MarkdownView(:content="information")
</template>

<script>
import Card from '../components/Card.vue';
import MarkdownView from '../components/MarkdownView.vue';
import config from '../config';
import axios from 'axios';

export default {
    name: 'User',
    components: {
        Card,
        MarkdownView
    },
    data: function () {
        return {
            avatar: '',
            nickname: '',
            description: '',
            information: ''
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
    width: 6em;
    height: 6em;
}

.avatar {
    width: 6em;
    height: 6em;
    border-radius: 50%;
}

.info-right {
    height: fit-content;
    margin: auto 0em 1em 1em;
}

.nickname {
    font-size: 180%;
}
</style>
