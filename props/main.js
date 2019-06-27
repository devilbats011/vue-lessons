Vue.component('child', {
  props: ['text'], //the props is the text <child :text=...
  template: `<div>{{ text }}</div>`
});

Vue.component('otherchild', {
  props: ['icecream'], //the props is the icecream <otherchild :icecream=...
  template: `<div>{{ icecream }}</div>`
})


Vue.component('child1', {
  props: {
   icecreambig: {
   type: String,
   required:true
   }
  }, //the props is the icecream <child1 :icecreambig=...
  template: `<div>{{ icecreambig }}</div>`
});



new Vue({
  el: "#app",
  data() {
    return {
      message: "hello Mr.Manggo", //the variable inside :text="message" 
      type: 'vanilla!' //the variable inside :icecream="type" 
      ,bigtype:`Caramel`,
      name:`like`,
    }
  }
})

