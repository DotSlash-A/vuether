<template>
  <nav class="container is-max-desktop p-4">
    <div class="is-flex is-flex-direction-row is-align-items-center">

      <p class="is-flex-grow-2 m-4 has-text-white"> <i class="fa-solid fa-location-dot p-1">Hyderabad</i></p>
      <input type="text" placeholder="search city..."
        class="input is-rounded m-4 has-background-dark has-text-white no-border" />


      <img class="is-rounded m-4" src="https://bulma.io/images/placeholders/128x128.png"
        style="border-radius: 100px; width:50px; height: 50px;">
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>

<style scoped>
.no-border {
  border: none;
}
input::placeholder {
  color: #E0E1E4;
}
</style>
