<template>
    <div class="current">
        <div class="item">You city <span class="cityName">{{data.name}}</span></div>
        <div class="item">{{data.main}}</div>
        <div class="item">{{data.description}}</div>
    </div>
</template>

<script>
    export default {
        props:['data'],
    }
</script>

<style scoped>
    .current{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: #333;
        color: #ddd;
        display: flex;
        flex-wrap: wrap;
        padding: 5px 15px;
    }
    .item{
        margin-right: 15px;
        font-size: 14px;
    }
    .cityName{
        color: orange;
    }
</style>