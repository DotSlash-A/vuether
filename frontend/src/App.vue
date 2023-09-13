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

<style scoped>

</style>
