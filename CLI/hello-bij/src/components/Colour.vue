<template>
  <div class="Colour"> <!--//is this class means anything??-->
   <h1>Coming Soon ...</h1>
  </div>
</template>

<script>
export default {
  
  name: 'Colour', //what the fart THis for??!?!
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
  

  
  div.Colour
  {
  padding: 0%;
  margin: 0% auto;
  color:white;
  margin-top:2rem;
  letter-spacing: 2px;
  animation: loopy 4s linear infinite;
  }
  @keyframes loopy
  {
    0%{ text-shadow: 0px 0px 0px white; }
    50%{ text-shadow: 0px 0px 6px white;letter-spacing: 3px; }
    100%{ text-shadow: 0px 0px 0px white; }
  }
</style>
