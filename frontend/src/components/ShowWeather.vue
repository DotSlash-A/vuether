<template>
  <div class="card p-2" v-if="displayWeather">
    <div class="is-flex is-flex-direction-row">
      <div class="is-flex is-flex-direction-column">
        <p class="is-text-4">Current Weather</p>
        <p class="is-text-1 has-text-weight-bold">{{ weatherStore.temp }}K</p>
      </div>
      <div class="is-flex is-flex-direction-column"></div>
    </div>
  </div>
</template>

<script>
import { useWeatherStore } from "../stores/weather";

export default {
  name: "ShowWeather",
  props: ["displayWeather"],
  data() {
    return {
      temperature: {},
    };
  },
  setup() {
    const weatherStore = useWeatherStore();
    return { weatherStore };
  },
  computed: {
    showCelsius() {
      this.temperature = this.weatherStore.getCelsius();
      console.log(this.temperature);
    },
  },
};  
</script>

<style></style>
