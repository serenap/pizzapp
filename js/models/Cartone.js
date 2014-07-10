define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza")

	var Cartone = Backbone.Model.extend({
		constructorName: "Cartone",
		default:{
			pizze: []
		},

		aggiungiPizza: function(pizza){
			var presente = false;
			for (var i = 0; i < this.pizze.length; i++) {
				if(this.pizze[i].nome == pizza.nome && this.pizze[i].ingredienti == pizza.serializzaIngredienti()){
					this.pizze[i].quantita++;
					presente = true;
				}
			};
			if(!presente)
				this.pizze.push({
					quantita: 1,
					nome: pizza.nome,
					ingredienti: pizza.serializzaIngredienti()
				});
		},

		rimuoviPizza: function(i){
			this.pizze.splice(i, 0);
		}
	});

	return Cartone;

});