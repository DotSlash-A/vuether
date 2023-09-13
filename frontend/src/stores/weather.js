import axios from "axios";

import { toRaw } from "vue";
import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => {
    return {
      temp: 0,
      minTemp: 0,
      maxTemp: 0,
      cityName: "",
      feelsLikeTemp: 0,
      weatherDescription: "",
    };
  },
  getters: {
    getCelsius: (state) => {
      const temperatures = {
        temp: state.temp - 273.15,
        minTemp: state.minTemp - 273.15,
        maxTemp: state.maxTemp - 273.15,
        feelsLikeTemp: state.feelsLikeTemp - 273.15
      }

      return temperatures;
    },
    getFahrenheit: (state) => {
      const temperatures = {
        temp: 1.8 * (self.temp - 273) + 32,
        minTemp: 1.8 * (self.minTemp - 273) + 32,
        maxTemp: 1.8 * (self.maxTemp - 273) + 32,
        feelsLikeTemp: 1.8 * (self.feelsLikeTemp - 273) + 32
      }

      return temperatures;
    }
  },
  actions: {
    async fetchWeatherData(city) {
      const apiUrl = "http://localhost:3000/api/weather";
      const payload = {
        city: city,
      };

      try {
        const { data } = await axios.post(apiUrl, payload);

        this.weatherDescription = data.weather[0].main;
        this.feelsLikeTemp = data.main.feels_like;
        this.maxTemp = data.main.temp_max;
        this.minTemp = data.main.temp_min;
        this.temp = data.main.temp;
        this.cityName = data.name;
      } catch (e) {
        console.error(e);
      }
    },
  },
});
