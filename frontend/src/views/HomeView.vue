<template>
  <div class="has-text-white-ter  has-text-centered mt-6 mb-6">
    <i class="fa-solid fa-cloud big-weather-icon"></i>
    <p class="mt-5 raleway-font">Cloudy</p>
  </div>

  <div class="columns  ">
    <div class="column is-6">
      <div class="is-flex is-flex-direction-column has-background-white-ter has-text-centered p-4 round circle  ">

        <p class="is-size-1 mt-2"> 26°C</p>
        <p class="mb-2"> H:26°C L:22°C</p>
      </div>
      
    </div>
    <div class="column is-6 ">
      <div class="is-flex is-flex-direction-column p-4">

        <p class="round has-background-white-ter has-text-centered p-4 mb-2 pill">2nd colum</p>
        <p class="round has-background-white-ter has-text-centered p-4 pill">2nd colum</p>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useWeatherStore } from "../stores/weather";
import ShowWeather from "../components/ShowWeather.vue";

export default {
  name: "HomeView",
  components: {
    ShowWeather,
  },
  data() {
    return {
      city: "",
      invalidCity: false,
      displayWeather: false,
      data: useWeatherStore(),
      temperature: 0,
      weatherData: {},
    };
  },
  setup() {
    const weatherStore = useWeatherStore();
    return { weatherStore };
  },
  methods: {
    async fetchWeather() {
      if (this.city.length == 0) {
        this.invalidCity = true;
        return;
      }
      const url = "http://localhost:3000/api/weather";
      const payload = {
        city: this.city,
      };
      try {
        const { data } = await axios.post(url, payload);
        const { main, name } = data;
        const { pressure, humidity } = main;
        this.changeToCelsius(main);

        console.log(data);
      } catch (e) {
        console.error(e);
      }

      // this.weatherStore.fetchWeatherData(this.city);
    },
    changeToCelsius(weatherdata) {
      let { temp, feels_like, temp_max, temp_min } = weatherdata;
      temp = (temp - 273.15).toFixed(2);
      feels_like = (feels_like - 273.15).toFixed(2);
      temp_max = (temp_max - 273.15).toFixed(2);
      temp_min = (temp_min - 273.15).toFixed(2);

      this.weatherData = {
        temp,
        feels_like,
        temp_max,
        temp_min,
      };
    },
  },
};
</script>

<style scoped>
.big-weather-icon {
  font-size: 10rem;
}

.round{
  border-radius: 999px;

}
.pill{

  width: 10rem;
  

}

.circle{
  width: 10rem;
  height:10rem;
}
</style>
