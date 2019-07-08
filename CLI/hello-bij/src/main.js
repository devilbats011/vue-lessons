import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
import HelloWorld from './components/HelloWorld.vue'
import Banana from './components/Banana.vue'

import Colour from './components/Colour.vue'
import Food from './components/Food.vue'
import Beverage from './components/Beverage.vue'


Vue.use(VueRouter);

const routes = [


{ path:'/colour/',component:Colour},
{ path:'/food/',component:Food},
{ path:'/Beverage/',component:Beverage},
//{ path:'/banana/:bId',component:Banana},	

]

const router = new VueRouter({
	routes,
	mode:'history' // x bgi keluar # kt url
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
