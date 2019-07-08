<template>
  <div id="food">
  <button @click="getFoods">Get Foods pasta  D?ata !</button>
   <div id="food-list" > <p >{{ addFoodlist }}</p></div>
   <div v-for="item in foods" >{{ item.food }}</div>
  </div>
</template>

<script>
import axios from "axios"
export default
{
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      foods:"NO FOOD..",
      addFoodlist:"",
    }
  },
  methods: {
    getFoods() {
      //   fetch("weather.json")
      //     .then(response => response.json())
      //     .then(data => (this.weatherDataList = data));
      // /https://www.food2fork.com/api/search?key=64d9082597043e59c22840b7a99eadc0&q=pasta&page=1
      axios.get("foods.json")
       .then(response => (this.foods = response.data));
      // console.Log(this.foods);
    },
    handle()
    {
      
      if(this.foods != "NO FOOD..")
      {
         //this.addFoodlist = `??`;
         this.foods.forEach((item)=>{
          console.log(item.food + `id: ${item.id}`);
          //this.addFoodlist += item.food +"<br>";
         });
      }
      else
      {  return this.foods }


    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#food
{
  margin:1rem auto;
}
div#food-list
{
  overflow:auto;
  max-height:80vh;
  padding: 0px;
  margin:1rem auto; 
  width: 70%;
  font-size: 0.8rem; 

}


</style>
