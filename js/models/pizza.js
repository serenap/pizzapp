define(function(require) {

	var Backbone = require("backbone");

	var Pizza = Backbone.Model.extend({
		constructorName: "pizza",
		default:{
			nome: '',
			categoria: '',
			immagine: null,
			ingredienti: [],
			prezzo:''
		},

		initialize: function(){
		},

		serializzaIngredienti: function(){
			/*var ingredientiString = [];
			for (var i = 0; i < this.ingredienti.length; i++) {
				ingredientiString.push(this.ingredienti[i]);
			};
			return ingredientiString.join(", ");*/
			return this.ingredienti.join(", ");
		}
	});

	return Pizza;

});