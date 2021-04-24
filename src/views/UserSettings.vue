<template lang="pug">
.container
    UserSettingsMenu(v-model:select="select")
    Card
        div(v-show="select === 1")
            .edit
                font-awesome-icon(icon="check", @click="update()")
                router-link(custom, v-slot="{ navigate }", :to="`/user/${user_id}`")
                    font-awesome-icon(icon="arrow-left", @click="back(navigate)")
            div(style="display: flex;")
                div(style="flex: 1;")
                    div
                        p.section-subtitle.inline-block.same-width 用户ID
                        p.inline-item.inline-block {{ user_id }}
                    div
                        p.section-subtitle.inline-block.same-width 用户名
                        p.inline-item.inline-block {{ username }}
                    div
                        p.section-subtitle.inline-block.same-width 昵称
                        el-input.inline-item.inline-block(v-model="nickname", size="medium", style="width: 16em;", ref="nickname")
                    div
                        p.section-subtitle.inline-block.same-width 性别
                        el-select(v-model="sex", size="medium")
                            el-option(v-for="(item, index) in sexText", :value="index", :label="item")
                    div
                        p.section-subtitle.inline-block.same-width 个性签名
                        el-input(v-model="description", size="medium", style="width: 32em;", ref="description")
                div
                    AvatarSelector.avatar(v-model:src="avatar")
            p.section-subtitle 个人主页
            MarkdownEditor.editor(v-model:content="information", ref="information")
        div(v-show="select === 2")
            p.section-subtitle 重设密码
            div
                p.inline-block.same-width 原密码
                el-input.inline-item.inline-block(v-model="oldPassword", size="medium", style="width: 16em;", ref="ole-password", show-password)
            div
                p.inline-block.same-width 新密码
                el-input.inline-item.inline-block(v-model="newPassword", size="medium", style="width: 16em;", ref="new-password", show-password)
            div
                p.inline-block.same-width 重复密码
                el-input.inline-item.inline-block(v-model="repeatPassword", size="medium", style="width: 16em;", ref="repeat-password", show-password)
</template>

<script>
import Card from '../components/Card.vue';
import Tag from '../components/Tag.vue';
import Button from '../components/Button.vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import TextField from '../components/TextField.vue';
import Selector from '../components/Selector.vue';
import AvatarSelector from '../components/AvatarSelector.vue';
import UserSettingsMenu from '../components/UserSettingsMenu.vue';
import config from '../config';
import { sexText } from '../const';
import axios from 'axios';

export default {
    name: 'UserSettings',
    components: {
        Card,
        Tag,
        Button,
        MarkdownEditor,
        TextField,
        Selector,
        AvatarSelector,
        UserSettingsMenu
    },
    data: function () {
        return {
            user_id: 0,
            avatar: '',
            username: '',
            nickname: '',
            sex: 0,
            description: '',
            information: '',
            select: 1,
            oldPassword: '',
            newPassword: '',
            repeatPassword: ''
        };
    },
    created: async function () {
        this.sexText = sexText;
        this.user_id = localStorage.getItem('user_id');

        await axios.get(`${config.apiServer}/user/detail`, {
            params: {
                user_id: this.user_id
            }
        }).then(res => {
            this.user_id = res.data.data.user_id;
            this.nickname = res.data.data.nickname;
            this.username = res.data.data.username;
            this.sex = res.data.data.sex;
            this.avatar = res.data.data.avatar;
            this.description = res.data.data.description;
            this.information = res.data.data.information;
            // this.rating = res.data.data.rating;
        });
    },
    methods: {
        update: function () {
            axios.post(`${config.apiServer}/user/update`, {
                nickname: this.nickname,
                sex: this.sex,
                avatar: this.avatar,
                description: this.description,
                information: this.information,
            }, {
                headers: {
                    'Authorization': this.$cookie.getCookie('token')
                }
            }).then(res => {
                this.nickname = res.data.data.nickname;
                this.sex = res.data.data.sex;
                this.avatar = res.data.data.avatar;
                this.description = res.data.data.description;
                this.information = res.data.data.information;
                localStorage.setItem('nickname', this.nickname);
                localStorage.setItem('avatar', this.avatar);
            });
        },
        back: function (navigate) {
            this.update();
            navigate();
        }
    }
};
</script>

<style scoped>
@import '~@/static/article.css';

.container {
    display: flex;
    flex-direction: row;
}

.container > *:not(:last-child) {
    margin-right: 20px;
}

.same-width {
    min-width: 5em;
}

.card {
    position: relative;
}

.editor {
    text-align: initial;
    height: 25em;
    border: solid 1px #efefef;
}

.edit {
    position: absolute;
    right: 0.7em;
    top: 0.7em;
}

.edit > * {
    padding-left: 0.5em;
    transition-duration: 0.3s;
}

.edit > *:hover {
    color: #686868;
}

.avatar {
    margin: 2em;
    width: 9em;
    height: 9em;
    border-radius: 50%;
}
</style>
