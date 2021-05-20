<template>
    <div class="current">
        <span class="cityName">{{data.name}}</span>
        <div class="item"></div>
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
        left: 90%;
        transition: 1s;
        background-color: #333;
        color: #ddd;
        display: flex;
        flex-wrap: wrap;
        padding: 5px 15px;
        margin: auto;
        width: 360px;
        height: 100vh;
        z-index: 100;
        right: 0;
    }
    .item{
        margin-right: 15px;
        font-size: 14px;

    }
    .cityName{
        color: orange;
        font-size: 20px;
        text-transform: uppercase;
        position: absolute;
        left: 20px;
        top: 50vh;
        transform: rotateZ(-90deg);
        transform-origin: left;
        letter-spacing: 1px;
        cursor: pointer;
    }

</style>