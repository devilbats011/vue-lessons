<template>
  <div>
  
  <nav id="SideMenu" :class="{actived : ListenOnForkFromParent === true}">

   <div class="leftTop-borderDeco mediumSpeed"></div>
   <div class="rightBottom-borderDeco mediumSpeed"></div>
    <section class="container">
      <router-link to="/colour">Color</router-link>  
      <span></span>
      <router-link to="/food">Food</router-link> 
      <span></span>
      <router-link to="/beverage">Beverage</router-link> 
      <span></span>
    </section>
  </nav>

</div>
</template>

<script>


export default {
   props: ['tSideMenu'],
   computed:{
    ListenOnForkFromParent()
    {
      return this.tSideMenu;
    }
   }

}
</script>


<style scoped>
#SideMenu
{
  position: fixed;
  z-index: 10px;
  top:62px;
  left:-330px; /* 0px <--> -330px */
  background: #ddd;
  width: 290px;
  height: 400px; 
  overflow: hidden;
  transition: .8s;
  
}
.actived
{
  left:0px !important;
}
.mediumSpeed
{
   transition: .8s;
}
.leftTop-borderDeco
{
  display: none;
  position: absolute;
  top:13px;
  left:13px;
  border-top: 2px solid #3e3e3e;
  border-left: 2px solid #3e3e3e;
  width:45%;
  height: 20%;
  pointer-events: none;
 
}

#SideMenu:hover > .leftTop-borderDeco
{
  width:40%;
  height: 15%;

}
.rightBottom-borderDeco
{
  position: absolute;
  bottom:13px;
  right:13px;
  border-bottom: 2px solid #3e3e3e;
  border-right: 2px solid #3e3e3e;
  width:35%;
  height: 25%;
  pointer-events: none;
}
#SideMenu:hover > .rightBottom-borderDeco
{
  width:40%;
  height: 30%;
}

.container
{
  height: 93%;
  width: 90%;
  margin:0.9rem auto;
  postion:relative;
  border:0px solid red;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: flex-start;
  color: #3e3e3e;
  
}
.container > a
{
  width: 80%;
  height: 40px;
  line-height: 2.1;
  background: #3e3e3e;
  color: white;
  border: 0px solid red;
  padding:1rem;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
  transition: .4s;
   text-decoration: none;
}

.container > a:hover
{
  text-shadow: 1px 0px 15px  black;
}

.container > span
{
  border:1px solid white;
  background: white;
  width:70%;
}

@media screen and (min-width: 710px) {
  #SideMenu
  {
    display: none;
  }
}

</style>
