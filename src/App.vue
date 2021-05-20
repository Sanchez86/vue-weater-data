<template>
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
  cities = JSON.parse(localStorage.getItem('cities') || []);
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

      console.log(cities);
      console.log(JSON.parse(localStorage.getItem('cities') || []));
    },
    checkedCity(id){
      const checkedCity = this.cities.filter(item => item.id == id);

      const result = getData(checkedCity[0].title);
      result.then(res => this.dataCity = res)
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
  }
}

</script>

<style>
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
