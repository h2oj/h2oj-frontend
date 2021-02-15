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
    position: relative;
    background-color: white;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
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
