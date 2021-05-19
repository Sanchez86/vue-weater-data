<template>
  <CurrentWeaterData v-bind:data="currentCity" />

  <div class="d-flex">

    <div class="left">
      <h1>Weather data</h1>
      <AddCity v-on:add-city="addCity" />

      <CitiesList
              v-bind:cities="cities"
              v-on:remove-city="removeCity"
              v-on:checked-city="checkedCity"
      />
    </div>
    <div class="right" v-if="Object.keys(dataCity).length > 0">
      <WeaterData v-bind:dataCity="dataCity" />
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
      this.cities.push(newCity);
      localStorage.setItem('cities', JSON.stringify(this.cities));
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
  .d-flex{
    display: flex;
  }
  .left{
    min-width: 400px;
    max-width: 400px;
    width: 100%;
    margin: 0 15px;
  }
  .right{
    width: 400px;
    border-left:1px solid #333;
    padding-left: 15px;
  }
  .right h2{
    text-align: center;
  }
#app {
  padding-top: 25px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: 15px auto;
}
</style>
