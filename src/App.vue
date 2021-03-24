<template>
 <main-page></main-page>
<!-- <div>
  <div id="nav">
      <router-link to="/calendar">Home</router-link> |
      <router-link to="/pinboard">About</router-link>
  </div>
  <router-view />
  </div> -->
</template>

<script>
/* import MyCal from './components/MyCal.vue'
import MyPin from './components/PinBoard.vue'
import MyToDo from './components/ToDo.vue' */
import MainPage from './components/MainPage.vue'

export default {
  name: 'App',
  components: {
 MainPage
    // MyCal,MyPin,MyToDo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 /* margin-top: 60px;*/
}
</style>
