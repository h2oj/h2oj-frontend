<template lang="pug">
.card
    slot
</template>

<script>
export default {
    name: 'Card'
}
</script>

<style scoped>
.card {
    background-color: white;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    padding: 20px;
    transition: box-shadow 0.25s;
}

.card:hover{
    box-shadow: 0 5px 7px rgba(26, 26, 26, .1);
}

.card:not(:last-child) {
    margin-bottom: 20px;
}

.card:last-child {
    margin-bottom: 0px;
}

.card-title-1 {
    font-weight: 600;
}
</style>
