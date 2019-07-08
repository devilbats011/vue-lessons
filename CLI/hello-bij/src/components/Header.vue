<template>
  <div>
  
  <header id="header" style="letter-spacing: 1px;" >
    <div  @click="onClickFork">
      <i class="fa fa-fork-awesome" aria-hidden="true"></i>
    </div>
    <div @click.prevent="addMoney" > <section id="cash-display" >$ {{money}}</section>
      <span class="money-talk"  ref="a" >$ {{plus_money}} +  </span>
       <span class="money-talk"  ref="aa" >$ {{minus_money}} -</span>
    </div>
    <div></div>
    <div>     <router-link to="/colour">Colour</router-link> </div>
    <span class="sh-border"></span>
    <div><router-link to="/food">Food</router-link> </div>
    <span class="sh-border" style="margin-right:1.6rem;"></span>
    <div><router-link to="/beverage">Beverage</router-link>   </div> <!--6 -->
    <span style="width:1.6rem;pointer-events: none"></span>


  </header>

</div>
</template>

<script>
import GlobalStore from "../store/GlobalStore"; //import from

export default {
   props: ['submitPayx',`TotalPriceSum`], //from parent
  data(){
    return {
      toggle: false,
      money:GlobalStore.money,
      plus_money:GlobalStore.plus_money,
      minus_money:0,
      glitch_fart:false,
      babi:"",
    }
  }
  ,
  methods:{
    onClickFork(event){
      this.toggle = this.toggle ? false : true;
      this.$emit('onClickFork', this.toggle);
    },
    addMoney()
    {
        this.glitch_fart = true;
         let money_talk = document.querySelector('.money-talk');
         //this.display_money = `${this.plus_money} +`;
        this.money = GlobalStore.methods.addMoney(this.plus_money);
         
         //console.log(this.money);
         if( money_talk.classList.contains('moneyAnimUp') )
         { money_talk.classList.remove('moneyAnimUp');setTimeout(()=>{money_talk.classList.add('moneyAnimUp');},0); }
         else
          money_talk.classList.add("moneyAnimUp");
         //{ money_talk.classList.remove("money-talk");setTimeout(()=>{money_talk.classList.add('money-talk','moneyAnimUp');},0); }
    },
    testbabi()
    {
      alert(this.submitPayx+":submitPayx");
    }

  },
  computed:{
    listen(){
    /*  console.log("brp kali listen?? " + this.submitPayx );
      if(this.submitPayx)
      {
        this.money = GlobalStore.money;
        alert(this.money);
      }

      if(!this.glitch_fart)
      {
        console.log("tolak tolak");

        this.babi = this.TotalPriceSum;
       // this.minusMoney();

      }
      else if(this.glitch_fart){
        this.glitch_fart = false;
        console.log("tak kacau clicked!");
      }
      return true;
      */
    },
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listen
{

}
#header{
  positon:relative;
  width:100%;
  height:60px;
  display:flex;
  border:2px solid #ddd; 

}
#header > div
{
  position: relative;
  color:#ddd;
  font-size: 0.95rem;
  font-weight:bold;
  display: flex;
  width: 66px;
  height: 100%;
  justify-content: center;
  align-items: center;


}
#header > div:nth-child(n+2)
{
    cursor: pointer;
    transition: .3s;
    text-shadow: 0px 7px 7px black;

}


.sh-border
{
  position: relative;
  margin:16px 10px;
  background: #ddd;
  width: 2px;
  pointer-events: none;
  height: 30px;
}
#header > div > i
{
  background: transparent;
  color:#734028;
  transform: scale(2.8);

}

#header > div:nth-child(1)
{ flex:1;  background: #ddd; }
#header > div:nth-child(2)
{
  padding-left: 0.8rem;
  flex:2;
  justify-content: left;
  font-size: 1.1rem;
}
#header > div:nth-child(3)
{
  flex:6;
  cursor: context-menu !important;
}

#header > div:nth-child(4)
{
  flex:1;
}
#header > div:nth-child(5)
{ flex:1;

}
#header > div:nth-child(6)
{
  flex:1;
}




@media screen and (max-width: 710px) {

  #big-block-1{
      flex-direction: column;
  }

#header > div:nth-child(1)
{ cursor: pointer; }
  
  #header > div:nth-child(-n+2)
  { flex:3; }

 
  #header > div:nth-child(3)
  {
    flex:6;
  }


  #header > div:nth-child(n+4)
  {
    display: none;
  }
  #header > span.sh-border
  {
    display: none;
  }
}

div{


}
div > a{
   color:white;
   text-decoration: none;
   width: 100%;
   height: 100%;
   margin-top:2.3rem;
  
}
</style>
