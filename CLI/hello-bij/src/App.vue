<template>
  <div id="app" >
  <Header @onClickFork="getClickFork"  :submitPayx="submitPayx" :TotalPriceSum="babi" /> <!-- :var send to child --> <!-- @var receive from child -->
  <main id="theBody"  >
    <section id="big-block-1">
    <LeftBlock :setOrderFood="foodOrder" @deleteOrder="deleteOrder" @submitPay="methodsubmitPay" /> <!-- :varforChild="the reactive" -->

    <RightBlock @getFoodOrders="getFoodOrders"/>
    </section>
  </main>
  <SideMenu :tSideMenu="toggleSideMenu"/>
  </div>
</template>

<script>
import Header from  './components/Header.vue'
import LeftBlock from './components/LeftBlock.vue'
import RightBlock from './components/RightBlock.vue'
import SideMenu from './components/SideMenu.vue'
//import Banana from './components/Banana.vue'
import Colour from './components/Colour.vue'
import Food from './components/Food.vue'
import Beverage from './components/Beverage.vue'
import GlobalStore from "./store/GlobalStore";


export default {
  name: 'app',
  components: {
    Header,
    LeftBlock,
    RightBlock,
    SideMenu,
    Colour,
    Food,
    Beverage
  },
  data(){
    return {
      toggleSideMenu:false,
      foodOrder:[],
      sum:0,
      no_money:true,
      test1:"",
      submitPayx:false,
      babi:"babi",

    }
  },
  methods: {
  
    getClickFork (value) {
       this.toggleSideMenu=value;
       //alert(this.toggleSideMenu);
    },
    getFoodOrders(item)
    {
      //console.log(item.food);
      //alert(item);
      let flag = false;
      this.foodOrder.forEach((data,i)=>{
         if(data.id == item.id){ data.amount++;flag= true;}

      });
      if(!flag)
      this.foodOrder.push(item);
    },
    deleteOrder(id)
    {
      
      for( var i = 0; i < this.foodOrder.length; i++){ 
         if ( this.foodOrder[i].id == id) {
           console.log(this.foodOrder[i]);
           this.foodOrder.splice(i, 1); 
           i--;
         }
      } 
    },
    TotalPrice(sum)
    {
      this.sum = sum;


      //console.log(this.sum);
      return this.sum;
    },
    methodsubmitPay(value)
    {
     // console.log(value + " submit PAY");
      this.submitPayx = value;
      console.log("submitpayx:"+this.submitPayx );
     if(!value)
        this.foodOrder = [];
    }
  },
  computed:{


  }

}


</script>

<style>

body{
  margin:0px;
  padding:0px;
  box-sizing:content-box;
   background:#3e3e3e;
}
#app {
  overflow-x: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
 }
#theBody{

  position:relative;
  width:100vw;
  min-height: calc(100vh - 70px);
}
#big-block-1
{
  display: flex;
  border:0px solid #ddd;
  width: 99.8%;
  min-height: calc(100vh - 68px);
}

.money-talk
{
  position: absolute;

  /*transition: .6s;*/
  pointer-events: none;
  font-size: 1rem;
  opacity: 0;
  transform: translate(132%,5%); /* 5% ~ -40% */
}
.moneyAnimDown
{
  color:crimson;
  animation: moneyFly 1s;
}
.moneyAnimUp
{
  color:lightgreen;
  animation: moneyTalk 1s;
}
@keyframes moneyTalk
{
  0% {opacity: 1;transform: translate(132%,10%); }
  100%{opacity: 0;transform: translate(132%,-40%); }
}

@keyframes moneyFly
{
  0% {opacity: 1;transform: translate(132%,-10%); }
  100%{opacity: 1;transform: translate(132%,60%); }
}



@media screen and (max-width: 710px) {

  #big-block-1{
      flex-direction: column;
  }
}

</style>

