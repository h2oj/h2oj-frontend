<template lang="pug">
Card
    p(style='font-size: 20px; margin: 0px') Hydrogen OJ Problem Set
Card
    DataGrid(:data="data")
        template(v-slot:head)
            th 状态
            th 题号
            th 题目名称
            th 标签
            th 难度
            th 通过率
        template(v-slot:body="{ item }")
            td {{ item[0] }}
            td {{ item[1] }}
            td {{ item[2] }}
            td: Tag(:text="item[3]")
            td: Tag(:text="item[4]")
            td {{ item[5] }}
</template>

<script>
import Card from '../components/Card.vue';
import DataGrid from '../components/DataGrid.vue';
import Tag from '../components/Tag.vue';

export default {
    name: 'ProblemList',
    components: {
        Card,
        DataGrid,
        Tag
    },
    data: function () {
        return {
            headers: ['状态', '题号', '题目名称', '标签', '难度', '通过率'],
            data: [
                ['-', '1000', 'Hello, world', '1', 0, 0],
                ['-', '1000', 'Hello, world', '2', 0, 0],
                ['-', '1000', 'Hello, world', '3', 0, 0],
                ['-', '1000', 'Hello, world', '4', 0, 0],
                ['-', '1000', 'Hello, world', '5', 0, 0],
                ['-', '1000', 'Hello, world', '6', 0, 0],
                ['-', '1000', 'Hello, world', '7', 0, 0],
                ['-', '1000', 'Hello, world', '8', 0, 0],
                ['-', '1000', 'Hello, world', '9', 0, 0],
                ['-', '1000', 'Hello, world', '10', 0, 0],
                ['-', '1000', 'Hello, world', '11', 0, 0]
            ],
            render: function (i, item) {
                console.log(i, item);
                switch (i) {
                    case 4: {
                        const difficultyName = [
                            '尚未评定', '入门', '普及-', '普及/提高-', '普及+/提高', '提高+/省选-',
                            '省选/NOI-', 'NOI/NOI+/CTSC'
                        ];
                        return difficultyName[item];
                    }
                    default: {
                        return item;
                    }
                }
            }
        };
    }
};
</script>

<style scoped>
.tag-difficulty-0 {
    background-color: #bfbfbf;
}

.tag-difficulty-1 {
    background-color: #fe4c61;
}

.tag-difficulty-2 {
    background-color: #f39c11;
}

.tag-difficulty-3 {
    background-color: #ffc116;
}

.tag-difficulty-4 {
    background-color: #52c41a;
}

.tag-difficulty-5 {
    background-color: #3498db;
}

.tag-difficulty-6 {
    background-color: #9d3dcf;
}

.tag-difficulty-7 {
    background-color: #0e1d69;
}
</style>
