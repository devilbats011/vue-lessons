let GlobalData = {
money:100,
plus_money:50,
methods:{
		addMoney(m)
		{
			GlobalData.money+=m;
			document.getElementById('cash-display').innerHTML =`$`+ GlobalData.money;
			return GlobalData.money;
		},
		pay(sum)
		{	

			return sum > GlobalData.money ? true : false ;
		},
	    minusMoney(sum)
	    {
	    
	    	let baki = GlobalData.money - sum;
	    	GlobalData.money = baki;
	        setTimeout(()=>{
	           // console.log(document.querySelector('.money-talk:nth-child(2)').innerText);
	           //document.querySelector('.money-talk:nth-child(2)') //not working, the result only get the first child..
	           document.getElementsByClassName('money-talk')[1].innerHTML = `-$`+sum;
	            let money_talk = document.getElementsByClassName('money-talk')[1];

	            document.getElementById('cash-display').innerHTML =`$`+ baki;
	            if( money_talk.classList.contains('moneyAnimDown') )
	              {
	                console.log(money_talk.classList.contains('moneyAnimDown'));
	               money_talk.classList.remove('moneyAnimDown');
	               setTimeout(()=>{money_talk.classList.add('moneyAnimDown');},10);
	                }
	            else
	              money_talk.classList.add("moneyAnimDown");
	        },10);
	     

	     //  console.log("supp!minusmoney");
	  
	    },
	}
};

export default GlobalData; //ready to be export to!

