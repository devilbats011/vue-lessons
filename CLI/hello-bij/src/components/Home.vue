<template>
  <div class="pishang"> <!--//is this class means anything??-->
        <h2>HELLo</h2>
    <h2>Pishang ID {{ $route.params.bId }}</h2>
    <button @click="goHome">home</button>
  </div>
</template>

<script>
export default {
  
  name: 'Food', //what the fart THis for??!?!
  props: {

  },
  methods: {
  	goHome(){
  		this.$router.push('/');
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
  padding: 0%;
  margin: 0% auto;
  }
</style>
