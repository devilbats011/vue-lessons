<template>
  <div id="LeftBlock" :class="{actived : listen === true}">
    <div class="order-box">
    	<nav>
    		<p>Order {{test1}} {{test2}}</p>
    		<div class="delete-icon" @dragover.prevent="dragOverDelete" @dragleave.prevent="dragLeaveDelete" @drop.prevent="dragDelete">
    			<i class="fa fa-trash-o" id="warning" aria-hidden="true"></i>
    			<div class="trash-description">
            <section ><i class="fa fa-exclamation-circle" aria-hidden="true"></i></section>
            <section ><span>Drag a food to the trash to cancel order.</span></section>   
          </div>
    		</div>
    	</nav>
    	<main>

    		<p v-for="item in foodOrder" :key draggable="true" @dragstart="dragStart(item.id)" @dragover.prevent 
			  @dragend="dragEnd(item.id)">
        {{item.food}}, ${{item.price}} <input type="number" v-model='item.amount' ></p>

    	</main>
    	<footer>
    	 <span id="total-price" style="">Total Price: ${{ totalSum }} </span>
    		<label  id="table-number" >
    		<input type="text" id="table-input"  v-model="msg" > <span id="table-span" :class="{moveSpanUp : msg !=''}" required=true >Table Number</span>
        <p id="er-submit" >{{error1}}</p>
    		</label>
    		<button type="submit" id="submit-order" @click.prevent="submit" style="" >order</button>
        
    		
    	</footer>
    </div>

    <div class="complete-order" style="top:-120px;">
      <nav style="background: #c5c5c5;cursor: pointer;"  @click.prevent="toggleCompleteOrder" ><p style=""> Order Complete, Total:${{great_sum}}</p></nav>
      <main style="background: #c5c5c5;border-bottom-left-radius: 0.8rem;border-bottom-right-radius: 0.8rem;padding-bottom:1rem; max-height: 360px;overflow: auto">
          
            <section class="co-order-wrap" v-for="(n,i) in completeOrder" >
              <main  @click="callback(i)" >Order-{{i+1}}</main>
              <main  ref="numbers"   style="height: 0px;" >
                <p v-for="nn in n" >{{nn.food}}  ,price:{{nn.price}}</p>
              </main>
            </section>
            <br><br>
         

          <div>


          </div>

      </main>
      <footer style="bottom:22px;padding:0xp;background:transparent;">
          <div class="">
            <div class="co-toggle"  @click.prevent="toggleCompleteOrder" ><p>ORDER &nbsp <i class="fa fa-sort-desc" aria-hidden="true"></i>
            <i class="fa fa-sort-asc" aria-hidden="true" ></i>
            </p></div>
          </div>
          
      </footer>
    </div>
  </div>
</template>

<script>
import GlobalStore from "../store/GlobalStore";
export default {
/*	
    ['setOrderFood','nomoney']
	},*/
   props: {
     setOrderFood: {
      type: Array,
      required:true,
      default: []
     },
    /* nomoney: {
      type: Boolean,
      required:true,
      default: true
     },*/

  }, //get this value from App.vue [parent component]
   data(){
   		return {
   		   foodOrder:[{food:"nuthing",price:0},{food:"nuthing2",price:0}],
         completeOrder:[],
   		   msg:``,
   		   test1:``,
   		   test2:``,
         error1:"",
   		   food_id:"empty",
         sum:0,
         great_sum:0,
         no_money:true,
         money:GlobalStore.money, //noice Global data!!
   		  
   		}
   },
   methods:{
    toggleCompleteOrder(s = null){
      // /*-85% to hide and 0% to display */
       let co = document.querySelector('.complete-order');
       if(s == `passive`)
        co.style.top = "0px";
       else
        co.style.top = co.style.top == "0px" ? -(co.clientHeight-100)+"px": "0px";

       console.log(co.clientHeight+"px");
    },
    callback(key){
    //  console.log(key);
      let item = this.$refs.numbers[key];
      console.log(item.children.length +`::`+ item.children[0].clientHeight);
      let sum = 30 +(item.children.length * item.children[0].clientHeight);
      let value = item.style.height == "0px" ? `${sum}px` : "0px";
      item.style.height = value;

    },
    submit()
    {
      if(this.msg == ``)
      {
        this.error1 = "This Field Is Required!"
      }
      else if(this.msg != `` && this.foodOrder[0].food != "nuthing" && this.foodOrder != null )
      {
        this.error1 = ``;
        //for (var i = 0; i < 10; i++) {
       // }
       document.getElementById('submit-order').disabled = true;
       this.test1 ="Loading.."; //loading
       setTimeout(()=> 
       {
         this.no_money = GlobalStore.methods.pay(this.sum); //sending the signal to rightblock.vue  
         if(this.no_money == false)
         {
           console.log(this.no_money+ " no money! ");
           GlobalStore.methods.minusMoney(this.sum);
           this.great_sum += this.sum;
           this.toggleCompleteOrder(`passive`);
           this.$emit('submitPay',this.no_money);
           this.completeOrder.push(this.foodOrder);
          // this.$emit('TotalPrice', this.sum); //hantar ke parent 
         }
        else{
                    alert(
                    `Insufficient Money, Smart Pant!`);
                    //this.$emit('nomoney',true);
          
        }
        
        document.getElementById('submit-order').disabled = false;
         this.test1 =""; //loading COmplete
       },1000);
      }
    },
   	dragStart(id)
   	{
   		this.food_id = id;
   	},
   	dragEnd(id){
   		this.food_id = "empty";
   		if(document.querySelector('.delete-icon').classList.contains(`delete-icon-drag`))
   			document.querySelector('.delete-icon').classList.remove(`delete-icon-drag`);
   	},
   	dragLeaveDelete(){
   		document.querySelector('.delete-icon').classList.remove(`delete-icon-drag`);
   	},
   	dragDelete()
   	{
   		if(this.food_id != "empty")
   		{

       		this.$emit('deleteOrder', this.food_id); //hantar ke parent 

       	}
   	},
   	dragOverDelete()
   	{
   		document.querySelector('.delete-icon').classList.add(`delete-icon-drag`);
   	}
   },
   computed:{
   	listen(){

     // this.no_money = this.nomoney;
      console.log(this.no_money + ` listen`);
      this.foodOrder = this.setOrderFood;
      return this.setOrderFood != null? true: false;
   	},
    totalSum()
    {
      let sum=0;
      this.foodOrder.forEach((food)=>{ sum+=food.price*food.amount });
      this.sum =  sum;
      return this.sum;
    }
   },
	directives: {
	 test: {
	  // directive definition
	  inserted: function (el) {
	   	console.log(el);
	   }
	  }
	}

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.actived{

}


#er-submit
{
  position: absolute;
  color:red;
  background: transparent;
  left:0px;
  top:10px;

  font-size: .6rem;
  pointer-events: none;
}

i:hover + .trash-description
{
  opacity: 1;
}
.trash-description
{
	position: absolute;
	top:0px;
	right:0px;
	transform: translate(8px,-53px);
	width: 200px;
	height: 40px;
	background: #2f2f2f;
	border:1px solid white;
	border-radius: 4px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: .4s;
  display: flex;
  flex-direction: row;

}

.delete-icon i
{
  color:crimson ;
  background: transparent;
}
.trash-description > section
{
  color:white;
  font-weight: 10px;
  position: relative;
  font-size:.6rem;



}
.trash-description >section:nth-child(1)
{
  border:1px solid white;
  padding-top:1px;
  font-size: 2.1rem;
  background: white;
  width: 50px;
  margin:0px;
}

.trash-description >section:nth-child(2)
{

  padding:7px 0px 2px 7px;

  text-align: left;
}

.cursor{
	cursor: crosshair !important;
}


.delete-icon
{
	position: absolute;
	
	font-size: 2rem;
	color:crimson;
	right: 1rem;
	top: 0.4rem;
	background: transparent;
	box-shadow: 0px 0px 0px 1px crimson;
	width: 40px;
	height: 35px;
	
	text-align: center;
	transition: .3s;

}
.delete-icon-drag{
	box-shadow: 0px 0px 2px 0px red;
	background: #3e3e3e;
}

div#LeftBlock{
  background-image: url('../assets/food-bg-jpg.jpg');
  background-size: cover;
  width:39%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  border:2px solid #ddd;
  margin-top:1rem;
  margin-left:1rem;
}
h3,h1 {
 color:white;
}

  .order-box
  {
  	border-top-left-radius: 0.8rem;
  	border-top-right-radius: 0.8rem; 
  	transition: .4s;
  	position: absolute;
  	background: #efefef;
  	width:80%;
  	overflow: visible;
  	display: flex;
  	flex-direction: column;
  	justify-content: flex-end;
  	max-height:82%; /*9% to hide and 82% to display */
  	bottom:110px;
  	right:1rem;


  }
  .complete-order{
    
     
    transition: .4s;
    position: absolute;
    background: #c5c5c5;
    width:80%;
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height:50%; 
    top:0px;
    left:1rem;
    background: transparent;
    overflow: auto;
    height: auto;
    top:0px;  /*-85% to hide and 0% to display */

  }

.co-order-wrap
{
  display: flex;
  flex-direction: column;
  border:1px solid black;
  width: 70%;
  margin:0 auto;
  position: relative;
  height: auto;


}
.co-order-wrap > main:first-child
{
  background:#3e3e3e;
  border:0px solid black;
  height: 30px;
  width: 100%;
  position: relative;
  
  cursor: pointer;
  
}
.co-order-wrap > main:last-child
{
  transition: .3s;
  position: relative;

  overflow: hidden;
  border:0px solid red;
  padding-top: 0px;
  
}

.co-toggle
{
  float: left;
  margin:1rem; 
  border:1px solid black;
  background: #c5c5c5;
  height: 20px;
  width: 66px;
  text-align: center;
  cursor: pointer;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  font-size:0.6rem;
  position: relative;
  top:-10px;
}
.co-toggle > p
{
  margin-top:5px;
}



  nav{
  	padding:0.5rem auto;
	   text-align: center;
  	border-bottom:1px solid #3e3e3e;
  }
  nav > p
  {
  	font-weight: bold;
  	letter-spacing: 1.5px;
  }

  main
  {

  	width: 100%;
	height: 60%;
	padding-top: 1rem;
	overflow: auto;
	display: block;
		
  }
  main > p
  {
  	text-align: justify;
  	font-size: 0.8rem;
  	padding: 1rem 4rem 1rem 2rem ;
	margin:6px 6px 0px 6px;
  	border:1px solid steelblue;
  	cursor: grab;
  	
  	position: relative;

  }
  main > p > input[type='number']
  {
  	position: absolute;
  	top:10px;
  	padding:3px;
  	right:6px;
  	width: 2.4rem;
  	height:1.1rem;
  	text-align: left;
  	
  }

  footer{
  	position: relative;
	background: #3e3e3e;
	width: 96%;
	border-radius: 0.2rem;
	margin:1.3rem auto;
	height: 58px;
	text-align: right;

  }
  
  #total-price{
    color:white;position: relative;font-size: 12px;float:left;
    left:0.9rem;top:1.4rem;
  }
  #table-input{
  	background: transparent;
  	border: 0px solid transparent;
  	box-shadow:0px 0px 0px black;
  	border-bottom: 1px solid white;
	padding-left:2px;
	width: 100px;
  }


   #table-input:focus  {
		outline:none;
   }

  #table-input:focus + #table-span,.moveSpanUp {
  	bottom:1.1rem !important;
  	font-size:0.7rem !important;
	
  }

  input[type="text"]{
    color: white ;
  }

  #table-number{
  	position: relative;
	
	margin:1rem; 
	height: 1.2rem;
  }

  #table-span{
	position: absolute;
	bottom: 0px;
	left:0px;
	font-size:0.6rem;
	color:white;
	bottom:0px;
	transition: 0.3s;
	pointer-events: none;
  }

  #submit-order
  {
  	background: lightgreen;
	padding-bottom:1.3rem;
  	padding-top: 5px;
  	height:1.5rem;
	margin:1rem 1rem 1rem 0px ;
  	border-radius: 0.2rem;
  	border:2px solid lightgreen;
  	letter-spacing: 1px;

  }	

@media screen and (max-width: 768px) {

 
}
@media screen and (max-width: 700px) {

  div#LeftBlock{
  width: 100% !important;
  height: 410px;
  flex-grow: 1;
  
  }
  .order-box
  {
    width: 96%;
  		bottom:0px;
      right:2%;
  }

  #table-input{
  		width: 68px;
  }

}
</style>
