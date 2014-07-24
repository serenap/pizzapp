define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza");

	var Cartone = Backbone.Collection.extend({
		constructorName : "Cartone",
		model : Pizza,

		aggiungiPizza: function(nuova_pizza){
			var presente = false;
			var i = 0;
			while(!presente && i<this.length){
				var pizza = this.at(i);
				if((pizza.get("nome") == nuova_pizza.get("nome")) && 
					(JSON.stringify(pizza.get("ingredienti")) == JSON.stringify(nuova_pizza.get("ingredienti")))){
					var quantita = pizza.get("quantita");
					quantita++;
					
					var nuovo_prezzo = nuova_pizza.get("prezzo")*(quantita);

					pizza.set("quantita", quantita);
					pizza.set("prezzo", nuovo_prezzo);
					presente = true;
				}
				i++;
			}
			if(!presente){
				nuova_pizza.set({"quantita": 1});
				this.push(nuova_pizza);
			}
		},

		rimuoviPizza: function(pizza){
			this.remove(pizza);
		}
	});

	return Cartone;
});