define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza");

	var Cartone = Backbone.Collection.extend({
		constructorName : "Cartone",
		model : Pizza,

		aggiungiPizza: function(nuova_pizza){
			//var presente = false;	
			this.each(function(pizza){
				if(pizza.get("nome") == nuova_pizza.get("nome") && pizza.get("ingredienti") == nuova_pizza.get("ingredienti")){
					pizza.set("quantita", pizza.get("quantita")++);
					pizza.get("prezzo", pizza.get("prezzo")*=pizza.get("quantita"));
					console.log("presente");
				}
			});
			/*if(!presente){
				nuova_pizza.set({"quantita": 1});
				this.push(nuova_pizza);
				console.log("assente");
			}*/
		},

		rimuoviPizza: function(pizza){
			this.remove(pizza);
		}
	});

	return Cartone;
});