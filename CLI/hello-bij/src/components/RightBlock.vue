<template>
  <div id="rightBlock" >
    
	<transition name="router-anim" > <!--  enter-active-class="animated fadeInUp"leave-active-class="animated fadeOutDown"  -->
      <router-view @foodOrders="getFoodOrders" ></router-view>
	</transition>
  </div>

</template>

<script>
export default {
  data(){
    return {
      //foodOrder:[],
    }
  },
  methods: {
    getFoodOrders(item)
    {
      //console.log(item.food);
      this.$emit('getFoodOrders', item);
      //this.foodOrder.push(item);
    }
 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


h3,h1 {
  color:white;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

div#rightBlock{
	
	background: transparent;
	width: 53%;
    box-sizing: content-box;
    min-height: 80vh;
    border:2px solid #ddd;
    margin:0px auto;
    position: relative;
    margin-top:1rem;

    padding: 0rem 0px 0rem 0px; /*top right bottom left*/
}

@media screen and (max-width: 700px) {

  div#rightBlock{
  width: 100% !important;
  flex-grow: 1;
  min-height: 600px;
  }
}



.router-anim-enter-active {
  transition: all .3s ease .5s;

}
.router-anim-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.router-anim-enter, .router-anim-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>
