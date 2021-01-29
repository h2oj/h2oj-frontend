<template lang="pug">
.container
    Card
        DataGrid(:data="user", :load="getPageData", :curPage="curPage", :pageCount="pageCount")
            template(v-slot:head)
                th.table-status 
                th.table-uid UID
                th.table-username 用户名
                th.table-username 昵称
                th.table-tag 前缀
                th.table-registertime 注册时间
                th.table-action 操作
            template(v-slot:body="{ item }")
                td.table-status -
                td.table-uid {{ item.uid }}
                td.table-username: router-link(:to="`/user/${item.uid}`" :class="`name-${item.level}`") {{ item.username }}
                td.table-username: router-link(:to="`/user/${item.uid}`" :class="`name-${item.level}`") {{ item.nickname }}
                td.table-tag: Tag(:text="item.tag" :class="`tag-${item.level}`")
                td.table-registertime Nil
                td.table-action Nil
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import axios from 'axios';
import config from '../config';

export default {
    name: 'Admin',
    components: {
        Card,
        DataGrid,
        Tag
    },
    data: function() {
        return {
            itemCount: 15,
            pageCount: 1,
            curPage: 1,
            user: [
                {
                    uid: 1,
                    username: 'AlexCui',
                    nickname: 'AlexCui_nickname',
                    tag: '摸鱼者',
                    level: 6,
                    //棕 灰 蓝 绿 橙 红 紫 
                }
            ]
        }
    },
    created() {
        axios.get(`${config.apiServer}/user/list`, {
            headers:
            {
                'Authorization': this.$cookie.getCookie('hoj_token')
            }
        }).then(res => {
            const { data } = res;
            this.user = data.data.users;
        })
    },
}
</script>

<style scoped>
.tag-0 {
    background-color: sienna;
}
.tag-1 {
    background-color: grey;
}
.tag-2 {
    background-color: #2f8bc9;
}
.tag-3 {
    background-color: #5eb95e;
}
.tag-4 {
    background-color: orange;
}
.tag-5 {
    background-color: red;
}
.tag-6 {
    background-color: purple;
}

.name-0 {
    color: sienna;
}
.name-1 {
    color: grey;
}
.name-2 {
    color: #2f8bc9;
}
.name-3 {
    color: #5eb95e;
}
.name-4 {
    color: orange;
}
.name-5 {
    color: red;
}
.name-6 {
    color: purple;
}

.center {
    text-align: center;
}

.table-status {
    text-align: center;
    width: 40px;
}

.table-uid {
    text-align: left;
    width: 70px;
}

.table-username {
    text-align: left;
}

.table-tag {
    text-align: center;
    width: 150px;
}

.table-action {
    text-align: center;
    width: 100px;
}

.table-registertime {
    text-align: center;
    width: 150px;
}

a {
    text-decoration: none;
    color: #2f8bc9;
}

a:hover {
    color: #1b4f72;
}

</style>