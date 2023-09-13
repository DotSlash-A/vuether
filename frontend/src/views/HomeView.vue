<template>
  <div class="p-6">
    <div class="columns">
      <div class="column is-half">
        <div class="is-flex is-flex-direction-column">
          <p class="is-size-5 has-text-weight-semibold mb-2">
            Enter your city:
          </p>

          <div class="is-flex is-flex-direction-row">
            <input id="city" type="text" name="city" v-model="city" placeholder="Bengaluru" class="input is-rounded mr-2"
              v-on:keypress="invalidCity = false" />
            <button class="button is-rounded is-dark" @click="fetchWeather">
              Get Weather 🌦️
            </button>
          </div>

          <small class="ml-4 mt-2 has-text-danger is-size-6 is-family-monospace has-text-weight-semibold"
            v-if="invalidCity">Invalid city name</small>
        </div>
      </div>
      <div class="column">
        <!-- <ShowWeather :displayWeather="displayWeather"></ShowWeather> -->
        <div class="card p-2">
          <div class="is-flex is-flex-direction-row">
            <div class="is-flex is-flex-direction-column">
              <p class="is-size-4">Current Weather</p>
              <p class="is-size-1 has-text-weight-bold">
                {{ weatherData.temp }}°C 
                feels like {{ weatherData.feels_like }}
              </p>
            </div>
            <div class="is-flex is-flex-direction-column"></div>
          </div>
        </div>
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
