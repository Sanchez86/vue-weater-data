<template>
    <li class="item">
        <label v-bind:class="{show: city.display}">
            <input type="radio"
                   name="cityName"
                   v-on:change="city.display = !city.display; $emit('checked-city', city.id)"/>

            <div class="item__temp">
                <img class="weather-icon" :src="`http://openweathermap.org/img/wn/${city.data.weather[0].icon}@2x.png`" alt="icon" />
                <span>{{showData()}}</span>
            </div>
            <div class="item__loc">
                {{city.title+', '+city.data.sys.country}}
            </div>
        </label>
        <div class="delete"
                v-on:click="$emit('remove-city', city.id)">
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            city: {
                type: Object,
                required: true
            },
            index:{
               type: Number,
               required: true
            }
        },
        methods: {
            showData(){
                const result = (this.city.data.main.temp-273.15).toFixed(2);

                if(result > 0){
                    return `+ ${result} °C`;
                }else{
                    return `${result} °C`;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid green;
        margin: 10px auto;
        padding: 10px;
        background-color: #03A9F4;
        border-radius: 5px;
        height: 40px;
        position: relative;
        padding-right: 48px;
        &__temp{
            width: 85px;
            min-width: 85px;
            display: flex;
            flex-direction: column;
            margin-left: 15px;
            span{
                position: relative;
                top: -7px;
            }
        }
        &__loc{
            font-size: 14px;
            margin-left: 10px;
            background-color: #3333334d;
            border-radius: 5px;
            padding: 5px 12px;
        }
    }
    .weather-icon{
        width: 45px;
        height: 45px;
    }
    .d-none{
        display: none;
    }
    .temp-icon{
        display: block;
        width: 23px;
        height: 28px;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTczLjY5OXB4IiBoZWlnaHQ9IjU3My42OTlweCIgdmlld0JveD0iMCAwIDU3My42OTkgNTczLjY5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTczLjY5OSA1NzMuNjk5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGc+PHBhdGggZD0iTTM0NC4yNSw0MDEuNjk5VjU3LjRjMC0zMi41LTI0LjktNTcuNC01Ny40LTU3LjRjLTMyLjUsMC01Ny40LDI2LjgtNTcuNCw1Ny40djM0NC4yYy0yMywxNy4yMDEtMzguMiw0NS45LTM4LjIsNzYuNWMwLDUzLjUsNDIuMSw5NS42LDk1LjYsOTUuNmM1My41LDAsOTUuNTk5LTQyLjEsOTUuNTk5LTk1LjZDMzgyLjQ0OSw0NDcuNSwzNjcuMTUsNDE4LjksMzQ0LjI1LDQwMS42OTl6IE0yODYuODUsNTU0LjY5OWMtNDIuMSwwLTc2LjUtMzQuMzk4LTc2LjUtNzYuNWMwLTI4LjY5OSwxNS4zLTUzLjUsMzguMi02Ni44OThWNTcuNGMwLTIxLDE3LjItMzguMiwzOC4yLTM4LjJzMzguMTk5LDE3LjIsMzguMTk5LDM4LjJ2MzUzLjc5OWMyMywxMy40LDM4LjIwMSwzOC4yMDEsMzguMjAxLDY2LjlDMzYzLjM1LDUyMC4xOTksMzI4Ljk0OSw1NTQuNjk5LDI4Ni44NSw1NTQuNjk5eiIvPjxwYXRoIGQ9Ik0zMDUuOTQ5LDQyNC42YzAtMS45LDAtMS45LDAtMy43OTl2LTk1LjYwMmMwLTExLjUtNy42LTE5LjEtMTkuMDk5LTE5LjFjLTExLjUsMC0xOS4xLDcuNi0xOS4xLDE5LjF2OTUuNjAyYzAsMS44OTgsMCwxLjg5OCwwLDMuNzk5Yy0yMyw3LjcwMS0zOC4yLDI4LjcwMS0zOC4yLDUzLjVjMCwzMi41LDI0LjksNTcuNCw1Ny40LDU3LjRjMzIuNDk5LDAsNTcuMzk5LTI0LjksNTcuMzk5LTU3LjRDMzQ0LjI1LDQ1My4zMDEsMzI4Ljk0OSw0MzIuMzAxLDMwNS45NDksNDI0LjZ6Ii8+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=);
    }
    label{
        display: flex;
        align-items: center;
        cursor:pointer;
        color: #fff;
        width: 100%;
    }
    input{
        width: 10px;
        height: 10px;
        margin-right: 10px;
        position: absolute;
        left: 0;
        top: 5px;
    }
    strong{
        margin-right: 10px;
    }
    .delete{
        position: absolute;
        right: 10px;
        top: calc(50% - 15px);
        background: transparent;
        border: 0;
        cursor: pointer;

        transition: .7s;
        width: 30px;
        height: 30px;

        &:hover{
            transform: rotateZ(90deg);
        }

        &:hover:before,
        &:hover:after{
            background-color: red;
        }

        &:before,
        &:after{
            content: "";
            display: block;
            top: 15px;
            position: absolute;
            width: 30px;
            height: 1px;
            background-color: #FFF;
            transform-origin: top;
            transition: .7s;
        }
        &:before{
            transform: rotate(45deg);
        }
        &:after{
            transform: rotate(-45deg);
        }
    }

</style>