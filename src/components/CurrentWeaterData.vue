<template>
    <div class="current"
         v-bind:class="{active: isActive}">
        <span class="cityName"
              v-on:click="myFilter">{{data.name}}</span>

        <div class="temp"> {{showDataTemp()}}</div>
    </div>
</template>

<script>
    export default {
        props:['data'],
        data(){
            return {
                isActive: false
            }
        },
        methods: {
            myFilter: function () {
                this.isActive = !this.isActive;
            },
            showDataTemp(){
                if(this.data.main){
                    const result = (this.data.main.temp-273.15).toFixed(2);
                    if(result > 0){
                        return ` + ${result} °C`;
                    }else{
                        return ` ${result} °C`;
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .temp{
        text-align: center;
        font-size: 42px;
        color: orange;
    }
    .current{
        position: absolute;
        top: 0;
        left: 90%;
        transition: 1s;
        background-color: #333;
        color: #ddd;
        padding: 5px 0 5px 40px;
        margin: auto;
        width: 360px;
        height: 100vh;
        z-index: 100;
        right: 0;
    }
    .current.active{
        left: 0;
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