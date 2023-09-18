<template>
  <div class="columns ">
    <div class="column has-background-success is-three-quarters">
      <div class="is-flex is-flex-direction-row p-2">
        <p class="m-2 mr-4">Today</p>
        <p class="m-2 mr-4">Tomorrow</p>
        <p class="m-2">Next 7 days</p>
      </div>

      <div class="card m-2" style="width: 300px;">
        <div class="is-flex is-flex-direction-column">
          <div class="is-flex is-flex-direction-row is-justify-content-space-between" style="background-color: yellowgreen;">
            <p class="m-1">Monday</p>
            <p class="m-1">11:42 PM</p>

          </div>
        </div>
      </div>
    </div>
    <div class="column has-background-link">
      Second column
    </div>
    <div class="columns is-mobile">
  <div class="column is-4 is-offset-8"></div>
</div>
  </div>

  <div class="columns ">
    <div class="column has-background-success is-three-quarters .is-variable 0.5rem">
      <div class="is-flex is-flex-direction-row p-2">
        <p class="m-2 mr-4">Today</p>
        <p class="m-2 mr-4">Tomorrow</p>
        <p class="m-2">Next 7 days</p>
      </div>

      <div class="card m-2" style="width: 300px;">
        <div class="is-flex is-flex-direction-column">
          <div class="is-flex is-flex-direction-row is-justify-content-space-between" style="background-color: yellowgreen;">
            <p class="m-1">Monday</p>
            <p class="m-1">11:42 PM</p>
          </div>
        </div>
      </div>
    </div>

    <div class="column has-background-link">
      Second column
    </div>
    <div class="columns is-mobile">
  <div class="column is-4 is-offset-8"></div>
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
      const url = "http://localhost:3000/api/weather"
      const payload = {
        city: this.city,
      }
      try {
        const { data } = await axios.post(url, payload)
        const { main, name } = data
        const { pressure, humidity } = main
        this.changeToCelsius(main)

        console.log(data);
      } catch (e) {
        console.error(e);
      }

      // this.weatherStore.fetchWeatherData(this.city);
    },
    changeToCelsius(weatherdata) {
      let { temp, feels_like, temp_max, temp_min } = weatherdata
      temp = (temp - 273.15).toFixed(2)
      feels_like = (feels_like - 273.15).toFixed(2)
      temp_max = (temp_max - 273.15).toFixed(2)
      temp_min = (temp_min - 273.15).toFixed(2)

      this.weatherData = {
        temp,
        feels_like,
        temp_max,
        temp_min
      }
    }
  },
};
</script>

<style scoped></style>
