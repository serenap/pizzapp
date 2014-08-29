define(function(require) {

	var Backbone = require("backbone");

	var Pizza = Backbone.Model.extend({
		constructorName: "pizza",
		default:{
			nome: '',
			categoria: '',
			immagine: null,
			ingredienti: [],
			prezzo: '',
			quantita: 0
		},
		
		serializzaIngredienti: function(){
			return this.ingredienti.join(", ");
		}
	});

	return Pizza;

});