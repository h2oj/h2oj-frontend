<template lang="pug">
.index-main
    .index-card
        .index-head.card.index-left 
            p.index-title Welcome to #[strong Hydrogen] OJ.
    .index-card 
        .index-head.card.index-right.index-hitokoto
            p.index-title 一言
            p#hitokoto.index-info
</template>

<script>
export default {
    name: 'Index',
    mounted: function () {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'https://v1.hitokoto.cn/?c=k&c=d&encode=json', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                document.getElementById('hitokoto').innerHTML = `「${res.hitokoto}」 <br/>———${res.from}`;
            }
        };
        xhr.send();
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
    text-align:right;
}

.index-title {
    font-size: 25px;
    font-weight: 200;
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}

.index-info { 
    font-size: 15px;
    margin-bottom: 5px !important;
}

.center {
    text-align:center;
    margin:auto;
}
</style>
