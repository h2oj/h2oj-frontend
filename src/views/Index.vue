<template lang="pug">
.container
    .container-left
        Card(style="padding: 0;")
            img.bannr(src="/static/banner.svg")
        Card
            p.index-title 欢迎来到H#[sub 2] OJ
            p 模拟只会猜题意，贪心只能过样例。
            p 数学上来先打表，ＤＰ一般赌ＲＰ。
            p 组合数学靠运气，计算几何瞎暴力。
            p 图论强行套模板，数论只会ＧＣＤ。
            p 递归递推伤不起，搜索茫然ＴＬＥ。
            p 分治做得像枚举，暴力枚举数第一。
            p 数据结构干瞪眼，怒刷水题找信心。
            p 涨姿势也不容易，考试一来全懵逼。
    .container-right
        Card
            p.index-title 今日
            div.calendar
                p.calendar-day(ref="calendar-day") 01
                p.calendar-date(ref="calendar-date") 2021 年 1 月
                p.calendar-luner(ref="calendar-lunar") 庚子年 十一月小 十九
        Card
            p.index-title 一言
            div.hitokoto
                p.hitokoto-detail(ref="hitokoto-detail") 今天也是元气满满的一天呢！
                p.hitokoto-src(ref="hitokoto-src") —— HOJ开发组
</template>

<script>
import Card from '../components/Card.vue';
import solarLunar from 'solarlunar';
import moment from 'moment';
import axios from 'axios';

const dayName = ['日', '一', '二', '三', '四', '五', '六'];

export default {
    name: 'Index',
    components: {
        Card
    },
    mounted: function () {
        axios.get('https://v1.hitokoto.cn/', {
            params: {
                c: 'k',
                encode: 'json'
            }
        }).then(res => {
            this.$refs['hitokoto-detail'].innerHTML = res.data.hitokoto;
            this.$refs['hitokoto-src'].innerHTML =  `—— ${res.data.from}`;
        });
        const date = new Date();
        const luner = solarLunar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
        this.$refs['calendar-day'].innerHTML = moment(date).format('DD');
        this.$refs['calendar-date'].innerHTML = `${date.getFullYear()}年 ${date.getMonth() + 1}月 星期${dayName[date.getDay()]}`;
        this.$refs['calendar-lunar'].innerHTML = `${luner.gzYear}年 ${luner.monthCn} ${luner.dayCn}` + (luner.term.length > 0 ? ' ' + luner.term : '');
    }
};
</script>

<style scoped>
p {
    margin: 0;
    text-align: left;
}

.container {
    display: flex;
}

.container-left {
    flex: 2;
    margin-right: 20px;
}

.container-right {
    flex: 1;
}

.index-title {
    font-weight: bold;
    font-size: 120%;
    margin: 0;
    margin-bottom: 0.5em;
}

.index-title:last-child {
    margin-bottom: 0;
}

.hitokoto-detail {
    text-align: left;
}

.hitokoto-src {
    text-align: right;
}

.calendar > p {
    text-align: center;
}

.calendar-day {
    font-size: 500%;
    margin-top: -0.2em !important;
}

.bannr {
    width: 100%;
    vertical-align: bottom;
}
</style>
