<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </RouterLink>

      <RouterLink role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </RouterLink>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">
          Home
        </RouterLink>

        <RouterLink class="navbar-item">
          Documentation
        </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <RouterLink class="navbar-link">
            More
          </RouterLink>

          <div class="navbar-dropdown">
            <RouterLink class="navbar-item">
              About
            </RouterLink>
            <RouterLink class="navbar-item">
              Jobs
            </RouterLink>
            <RouterLink class="navbar-item">
              Contact
            </RouterLink>
            <hr class="navbar-divider">
            <RouterLink class="navbar-item">
              Report an issue
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink class="button is-primary">
              <strong>Sign up</strong>
            </RouterLink>
            <RouterLink class="button is-light">
              Log in
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    }
  }
}

</script>