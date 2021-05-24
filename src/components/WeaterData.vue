<template>
    <h2>

        <img class="weather-icon"
             v-if="dataCity?.weather"
             :src="`http://openweathermap.org/img/wn/${dataCity?.weather[0]?.icon}@2x.png`"
             alt="icon"
        />

        {{dataCity.name}}

    </h2>
    <div class="weater-data">

        <h3>
            {{dataCity?.weather && dataCity?.weather[0]?.description}}

            {{showDataTemp()}}
        </h3>
        <h3>Feels like: {{showDataFeels()}}</h3>
        <h3>Wind: {{dataCity?.weather && dataCity.wind.speed}}</h3>
    </div>
</template>

<script>
    export default {
        props: {
            dataCity: {
                type: Object,
                required: true
            },
        },
        methods: {
            showDataTemp(){
                if(this.dataCity?.weather){
                    const result = (this.dataCity.main.temp-273.15).toFixed(2);
                    if(result > 0){
                        return ` + ${result} °C`;
                    }else{
                        return ` ${result} °C`;
                    }
                }
            },
            showDataFeels(){
                if(this.dataCity?.weather){
                    const result = (this.dataCity.main.feels_like-273.15).toFixed(2);
                    if(result > 0){
                        return `+ ${result} °C`;
                    }else{
                        return `${result} °C`;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    h2{
        margin-top: 0;
        margin-bottom: 0;
        background-color: #03A9F4;
        display: flex;
        align-items: center;
        color: #FFF;
    }
    img{
        width: 50px;
        height: 50px;
        object-fit: contain;
    }
    .weater-data{
        padding: 0 10px;
        h3{
            font-size: 16px;
        }

    }
</style>