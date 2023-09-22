<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
export default{
  data(){
    return{

    }
  },
  components:{
    Navbar

  }
}
</script>


<template>
  <header>
    <Navbar></Navbar>
    
  </header>

  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap');


#app {
  background-image: url("./assets/sunny.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  margin: auto;
}

@media only screen and (min-width: 768px) {
  #app {
    width: 30vw;
  }
} 

.raleway-font{
  font-family: 'Raleway', sans-serif;
}
</style>
