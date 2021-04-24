<template lang="pug">
.container
    Card
        DataGrid(:data="user", :load="getPageData", :curPage="curPage", :pageCount="pageCount")
            template(v-slot:head)
                th.table-uid 用户 ID
                th.table-username 用户名
                th.table-username 昵称
                th.table-tag 前缀
                th.table-regtime 注册时间
                th 用户组
                th.table-action 操作
            template(v-slot:body="{ item }")
                td.table-uid {{ item.user_id }}
                td.table-username: router-link(:to="`/user/${item.user_id}`" :class="`name-${item.level}`") {{ item.username }}
                td.table-username: router-link(:to="`/user/${item.user_id}`" :class="`name-${item.level}`") {{ item.nickname }}
                td.table-tag: Tag(:text="item.tag" :class="`tag-${item.level}`")
                td.table-registertime {{ moment(item.reg_time * 1000).format('MM/DD HH:mm:ss') }}
                td {{ role[item.role_id] }}
                td.table-action
                    router-link(custom, v-slot="{ navigate }", :to="`/user/${item.user_id}/edit`")
                        font-awesome-icon(icon="wrench", @click="navigate")
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';
import Button from '../components/Button.vue';
import config from '../config';
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'Admin',
    components: {
        Card,
        DataGrid,
        Tag,
        Button
    },
    data: function() {
        return {
            itemCount: 15,
            pageCount: 1,
            curPage: 1,
            user: [],
            role: {}
        }
    },
    created: async function () {
        this.moment = moment;
        await axios.get(`${config.apiServer}/user/list_role`, {
            headers: {
                'Authorization': this.$cookie.getCookie('token')
            }
        }).then(res => {
            const { data } = res;
            for (const role of data.data.roles) {
                this.role[role.role_id] = role.name;
            }
        });
        await this.getPageData(1);
    },
    methods: {
        getPageData: async function (page) {
            await axios.get(`${config.apiServer}/user/list`, {
                params: {
                    page: page
                },
                headers: {
                    'Authorization': this.$cookie.getCookie('token')
                }
            }).then(res => {
                const { data } = res;
                this.user = data.data.users;
            });
        }
    }
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