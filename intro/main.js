Vue.component('product',{
	props:{
		premium: {
			type: Boolean,
			required: true,
		}
	},
	template: 
	`
	<div class="product">
		<div class="product-image">
			<img :src="image">
		</div>

		<div class="product-info">
			<h1>{{title}}</h1>
			<p> User is Premium: {{premium}} </p>
			<p v-show="onSales"> It's On Sales!! Get your Green Socks now Folks-! </p>
			<p v-if="countStock > 10" >In Stock. </p>
			<p v-else-if="countStock <= 10 && countStock > 0">Stock Almost Deplete!</p>
			<p v-else> Stock Depleted.</p>
			<p> Shiping: {{shipping}}</p>
			<ul>
				<li v-for="d in details">{{d}}</li>
			</ul>

			<div v-for="(v ,index) in variants"
				 :key="v.variantId"
				 class="color-box"
				 :style="{backgroundColor: v.variantColor}"
				 v-on:mouseover="UpdateProduct(index)" >
				
			</div>

			<button @click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}"> Add to Cart </button><br>
			<button v-on:click="removeFromCart" v-show="cart > 0" > Remove from Cart </button><br>

			<div class="cart">
				<p> Cart ({{cart}}) </p>
			</div>


		</div>
	</div>
	`,
	data()
	{
		
    	return {
			product: `Socks`,
			brand: "Vue Mastery",
			inventory: 100,
			selectedVariant: 0, //image
			onSales: false,
			cart: 0,
			details: [`80% cotton`,`20% polyester`,`Gender-neutral`],
			variants: [{
				variantId: 337,
				variantColor:"Green",
				variantImage: `vmSocks-green.jpg`,
				variantQuantity:100,
				variantSize:['L','M','S']
			},
			{
				variantId: 338,
				variantColor:"Blue",
				variantImage: `vmSocks-blue.jpg`,
				variantQuantity:100,
				variantSize:['L','M','S'],

			}],
		}

	},

	methods: {
		addToCart(){
			this.cart += 1
		},
		removeFromCart()
		{ this.cart -= 1},
		UpdateProduct(index)
		{ this.selectedVariant = index; }
	},
	computed:
	{
		title()
		{ return this.brand + ` ` + this.product },

		image()
		{ return this.variants[this.selectedVariant].variantImage},

		inStock()
		{ return this.variants[this.selectedVariant].variantQuantity <= 0? false : true },
		countStock()
		{ return this.variants[this.selectedVariant].variantQuantity },
		shipping()
		{ return this.premium ? "Free" : 2.99 }
	}

});

var app = new Vue({
	el:"#app",
	data: {
		premium: true
	}
});
