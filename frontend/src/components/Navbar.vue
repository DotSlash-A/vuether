<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/"> Home </RouterLink>

        <RouterLink class="navbar-item" to="/about"> About </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <RouterLink class="navbar-item" to="/about"> About </RouterLink>
            <RouterLink class="navbar-item" to="/jobs"> Jobs </RouterLink>
            <RouterLink class="navbar-item" to="/jobs"> Contact </RouterLink>
            <hr class="navbar-divider" />
            <RouterLink class="navbar-item" to="/report">
              Report an issue
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink class="button is-rounded is-link" to="/register">
              <strong>Register</strong>
            </RouterLink>
            <RouterLink
              class="button is-rounded is-primary has-text-black"
              to="/login"
            >
              Log in
            </RouterLink>
          </div>
        </div>
      </div>
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

<style scoped></style>
