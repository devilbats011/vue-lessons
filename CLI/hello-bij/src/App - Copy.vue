<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <hr>
    <router-link to="/">Home</router-link> &nbsp

    <hr>
    <router-view></router-view>
   <!-- <Banana bananaMsg="IM A BANANANANAANANANANANANANANANAN!!!!"/>
    <HelloWorld msg="Welcome BRO to Your Vue.js App"/>-->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Banana from './components/Banana.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Banana
  }
}



</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
