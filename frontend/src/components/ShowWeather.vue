<template>

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
