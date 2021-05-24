<template>
  <button class="update"
          v-on:click="refreshCities()"
          v-bind:class="{active: isActive}"></button>
  <div class="app" v-bind:class="{open: Object.keys(dataCity).length > 0}">
    <CurrentWeaterData v-bind:data="currentCity" />

    <div class="inner">
      <AddCity v-on:add-city="addCity" />

      <CitiesList
              v-bind:cities="cities"
              v-on:remove-city="removeCity"
              v-on:checked-city="checkedCity"
      />

      <div class="detailed-data" v-bind:class="{active: Object.keys(dataCity).length > 0}">
        <WeaterData v-bind:dataCity="dataCity" />
      </div>
    </div>

  </div>
</template>

<script>

import CitiesList from '@/components/CitiesList'
import AddCity from '@/components/AddCity'
import WeaterData from '@/components/WeaterData'
import CurrentWeaterData from '@/components/CurrentWeaterData'

const _apiKey = 'b382e0b397c5ea35034ea0146ff99b78';

let cities = [];

try{
  if(localStorage.getItem('cities') !== null){
    cities = JSON.parse(localStorage.getItem('cities'));
  }else{
    cities = [];
  }
}
catch(ex){
  console.error(ex);
}


// If one argument comes, then it is a choice by city.
// If two arguments come in, it is a latitude and longitude choice.
const getData = async (arg1, arg2) => {
  let geo = '';
  let title = '';

  if(arg1 && arg2){
    geo = `lat=${arg1}&lon=${arg2}`;
  }else{
    title = `q=${arg1}`;
  }
  const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?${title}${geo}&appid=${_apiKey}`);
  if(!res.ok){
    throw new Error (`not work fetch url. Status: ${res.status}`)
  }
  return await res.json();
};


export default {
  name: 'App',

  data(){
    return{
        cities: cities,
        dataCity : {},
        currentCity : {},
        isActive: false
    }
  },
  components: {
    CitiesList, AddCity, WeaterData, CurrentWeaterData
  },
  methods: {
    removeCity(id){
      this.cities = this.cities.filter((item)=>item.id !== id);
      localStorage.removeItem('cities');
      localStorage.setItem('cities', JSON.stringify(this.cities));
    },
    addCity(newCity){
      const result = getData(newCity.title);
      result.then(async (res) => {
        await res;
        newCity.data = res;
        this.cities.push(newCity);
        localStorage.setItem('cities', JSON.stringify(this.cities));
      });
    },
    checkedCity(id){
      const checkedCity = this.cities.filter(item => item.id == id);

      const result = getData(checkedCity[0].title);
      result.then(res => this.dataCity = res)
    },
    refreshCities(){
      this.isActive = true;

      if(this.cities.length > 0){

        localStorage.removeItem('cities');

        let promises = [];

        this.cities.forEach(city => {
          promises.push(getData(city.title).then(cityResult => {
            return {
              ...city,
              data: cityResult,
            };
          }));
        });

        Promise.all(promises).then(res => {
          let tempArr = [];
          res.forEach(city => {
            tempArr.push(city);
          });
          this.cities = tempArr;
          localStorage.setItem('cities', JSON.stringify(this.cities));
          setTimeout(() => {
            this.isActive = false;
          }, 1000)

        });

      }

    }
  },
  mounted(){

    //get current geo position
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = async (pos) => {
      const crd = pos.coords;

      this.currentCity = await getData(crd.latitude, crd.longitude);
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);


    //refresh data of cities
    //this.refreshCities();
  }
}

</script>

<style scoped lang="scss">
  .update{
    position: absolute;
    top: 18px;
    left: 29px;
    border: 0;
    height: 50px;
    width: 42px;
    background-color: #808080;
    z-index: 1;
    box-shadow: 0 0 10px #00000052;
    cursor: pointer;
    transition: .5s;

    &:after{
      content: "";
      background-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTU1LjcyNHB4IiBoZWlnaHQ9IjE1NS43MjNweCIgdmlld0JveD0iMCAwIDE1NS43MjQgMTU1LjcyMyIgIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnIGlkPSJfeDMzXzUwLl9SZXBlYXQiPjxnPjxwYXRoIGQ9Ik00Mi43MzUsMTIxLjUyMWMtMTIuNzctMTAuMjczLTIwLjk0Mi0yNi4wMjUtMjAuOTQyLTQzLjY5MWMwLTI2LjExNCwxNy44ODItNDcuOTkyLDQyLjA1MS01NC4yM1Y5LjE1NEMzMS44NTQsMTUuNjQ2LDcuNzc2LDQzLjkyNyw3Ljc3Niw3Ny44M2MwLDIwLjk1MSw5LjE5OSwzOS43MzgsMjMuNzY3LDUyLjU3OEM0Mi44MTksMTQwLjkxMSw0OS44MjcsMTI2Ljg5NCw0Mi43MzUsMTIxLjUyMXogTTEyMy41ODksMjQuNzQ2Yy03LjE4LTYuNDg1LTE3LjY5Myw0LjAyOC0xMC44MDEsOS4yMzZjMTIuODg4LDEwLjI3LDIxLjE0MywyNi4wOTcsMjEuMTQzLDQzLjg0OGMwLDI2LjExOC0xNy44ODUsNDgtNDIuMDUyLDU0LjIzNHYxNC40NDljMzEuOTktNi40OTksNTYuMDY4LTM0Ljc3Niw1Ni4wNjgtNjguNjg0QzE0Ny45NDcsNTYuNjAyLDEzOC41MDIsMzcuNTk2LDEyMy41ODksMjQuNzQ2eiBNNzAuMDM3LDM1LjcwN2wyMi44MTMtMTMuNjYxYzMuMzE5LTEuOTg4LDMuMzI2LTUuMjI2LDAuMDE4LTcuMjI4TDY5Ljg0NCwwLjg4M2MtMy4zMTItMS45OTktNS45ODUtMC40OS01Ljk2OSwzLjM4MWwwLjEyNCwyOC4wMzVDNjQuMDA5LDM2LjE2OCw2Ni43MTQsMzcuNjk1LDcwLjAzNywzNS43MDd6IE04NS44ODMsMTIwLjAyOWwtMjMuMDI3LDEzLjkzNWMtMy4zMTEsMi4wMDItMy4zMDQsNS4yMzksMC4wMTksNy4yMjhsMjIuODExLDEzLjY2MmMzLjMxOSwxLjk4NCw2LjAzLDAuNDYyLDYuMDQ3LTMuNDEybDAuMTItMjguMDM0QzkxLjg2NSwxMTkuNTQsODkuMTg4LDExOC4wMyw4NS44ODMsMTIwLjAyOXoiLz48L2c+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=);
      background-position: center;
      background-repeat: no-repeat;
      filter: invert(1);
      background-size: 20px;
      height: 50px;
      width: 42px;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
     }
  }
  .update.active{
    background-color: #03A9F4;
  }
  .update.active:after{
    animation: 1s linear 0s alternate update;
  }

  @keyframes update {
    from{
      transform: rotateZ(0deg);
    }
    to{
      transform: rotateZ(360deg);
    }
  }

  body{
    margin: 0;
  }
  .inner{
    min-width: 320px;
    max-width: 320px;
    position: relative;
    padding-top: 55px;
    height: calc(100vh - 55px);
  }
  .app{
    min-width: 360px;
    max-width: 360px;
    height: calc(100vh - 30vh - 1px);
    width: 100%;
    margin: auto;
    padding: 0 10px 30vh 10px;
    position: relative;
    background-color: #4B4B4D;
    overflow: hidden;
  }
  .detailed-data{
    position: absolute;
    bottom: -30vh;
    left: 0;
    right: 0;
    height: 30vh;
    overflow: hidden;
    background-color: #fff;
    padding: 0 15px;
    font-size: 14px;
    transition: .5s;
  }
  .app.list{
    max-height: 60vh;
  }
  .detailed-data.active{
    bottom: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
