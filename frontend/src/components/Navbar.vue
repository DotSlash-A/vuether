<template>
  <nav class="columns p-4 has-text-white-ter">
    <div class="column is-1">
      <span class="icon">
        <i class="fa-solid fa-bars"></i>
      </span>

    </div>
    <div class="column is-10 has-text-centered ">
      <p class="raleway-font">Bengaluru</p>
    </div>

    <div class="column is-1">
      <span class="icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
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
