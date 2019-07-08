<template>
  <div id="food">
   <div id="food-list" >
    <h2 style="color:white;">List of Beverage </h2>

  <button :disabled="pageNumber === 0"  @click="prevPage"> Previous </button> &nbsp &nbsp
  <button :disabled="pageNumber >= pageCount -1"  @click="nextPage"> Next </button>
  </div>

   <div v-for="(item,i) in paginatedData" :key class="container" >
    <div style="" class="food-wraper">
          <div title="Click to View" class="q-toggle" @click.prevent="qToggle(i)" > <i class="fa fa-question-circle" aria-hidden="true"></i></div>
          <div class="food-btn" @click.prevent="foodOrders(item)" > {{ item.food }} </div>
    </div>

      <div class="display" style="height: 0px;overflow: hidden;transition:.4s;">
        <div class="food-img" :style="{ 'background-image': 'url(' + require(`../assets/${item.url}`) + ')' }" > </div>
          <div><p>{{item.desc}} </p></div>
      </div>
     
  </div>




   </div>
  </div>
</template>

<script>
import axios from "axios"
export default
{
  name: 'Food',
  props: {
     /* listData:{
        type:Array,required:true
      },
      size:{
        type:Number,required:false,default:10
      }
    */
  },
  data(){
    return {
      foods:"NO FOOD..",
      //listData:[],
      size:5,
      pageNumber:0, //default kosong
    }
  },
  created(){
    axios.get("beverages.json").then(response => (this.foods = response.data));
  },
  methods: {
    nextPage(){
      this.pageNumber++;
    },
    prevPage(){
      this.pageNumber--;
    },
    getFoods() {
      //   fetch("weather.json")
      //     .then(response => response.json())
      //     .then(data => (this.weatherDataList = data));
      // /https://www.food2fork.com/api/search?key=64d9082597043e59c22840b7a99eadc0&q=pasta&page=1
      axios.get("beverages.json")
       .then(response => (this.foods = response.data));
      // console.Log(this.foods);
    },
    foodOrders(item)
    {
       this.$emit('foodOrders', item);
      
    },
    qToggle(i)
    {
      //console.log(document.getElementsByClassName("display")[i]);
      let d = document.getElementsByClassName("display")[i]
      //let sumHeight = d.children[0].clientHeight +  d.children[1].clientHeight;
      let dd = d.style.height == "0px" ?  `300px` : "0px";
      d.style.height = dd;
    }

  },
  computed:{
    pageCount(){
      let l= this.foods.length,
          s= this.size;

          console.log("pageC0unt::V::");
          console.log(Math.ceil(l/s)); //5/2
          return Math.ceil(l/s);
    },
    paginatedData(){
      let start = this.pageNumber * this.size, 
      end = start + this.size;
      return this.foods.slice(start,end); 
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  border: 0px solid green;
  margin:0 auto;
  width: 80%;

}

.food-wraper
{
  width:100%;
  display: flex;
  justify-content: center;

}
.food-wraper > div
{
  color:white;
}

.food-wraper > div:first-child
{
  cursor:help;
  font-size: 1.4rem;
  padding-top: 10px;

}
.food-wraper > div:last-child
{
  border-bottom:1px solid white;
  cursor: pointer;

}

.food-btn
{
  margin:6px;
  padding:0.4rem 0.6rem;

}
.display
{
  poistion:relative;
  margin:0 auto;
  width: 80%; 
  display:flex;
  flex-direction: row;
  border:0px solid black;
  align-items: center;
  
  

}

.display > div
{
    
    height:260px;
    color: white;
}
.display div:first-child
{
  border:0px solid red;
  background-size:100% 100%;
  border-radius: 0px;
  width: 60%;


}
.display div:last-child
{
  padding-left:10px;
  font-size: 12px;
  width: 40%;
  margin-bottom:2rem;

}
#food
{
  margin:1rem auto;
  overflow: auto;
}
div#food-list
{
  
  max-height:80vh;
  padding: 0px;
  margin:1rem auto; 
  width: 70%;
  font-size: 0.8rem; 

}
.food-img
{
  background-size: 100% 100%;
  background-repeat: no-repeat;
  
}

@media screen and (max-width: 710px) {

  .display{
      flex-direction: column;
  }
  .display > div
  {
    width: 100% !important;
    height: 100%;
  }

  .display div:last-child
  {
  
  font-size: 10px;
    margin-bottom:0.1rem;
    height: auto;

  }
}

</style>
