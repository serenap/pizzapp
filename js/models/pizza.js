define(function(require) {

	var Backbone = require("backbone");
	var Ingrediente = require("models/Ingrediente");

	var Pizza = Backbone.Model.extend({
		constructorName: "Pizza",
		default:{
			nome: '',
			categoria: '',
			immagine: undefined,
			ingredienti: [],
			prezzo: 0
		},

		serializzaIngredienti: function(){
			return this.ingredienti.join(", ");
		},

		aggiornaIngrediente: function(i, aggiunto){
			this.ingredienti[i].aggiunto=aggiunto;
		}
	});

	return Pizza;

});