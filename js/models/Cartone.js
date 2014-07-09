define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza")

	var Cartone = Backbone.Model.extend({
		constructorName: "Cartone",
		default:{
			pizze: []
		},

		aggiungiPizza: function(pizza){
			for (var i = 0; i < this.pizze.length; i++) {
				if(this.pizze[i].nome == pizza.nome && this.pizze[i].ingredienti == pizza.serializzaIngredienti())
					this.pizze[i].quantita++;
			};
//			return this.pizze.push({
//				quantita: 1,
//				nome: pizza.nome,
//				ingredienti: pizza.serializzaIngredienti()
//			});
		},

		rimuoviPizza: function(i){
			this.pizze.splice(i, 0);
		}
	});

	return Cartone;

});