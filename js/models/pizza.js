define(function(require) {

	var Backbone = require("backbone");
	var ListaIngredienti = require("models/ListaIngredienti");

	var Pizza = Backbone.Model.extend({
		constructorName: "Pizza",
		default:{
			nome: '',
			categoria: '',
			immagine: null,
			ingredienti: new ListaIngredienti(),
			prezzo: 0
		},

		serializzaIngredienti: function(){
			var ingredientiString = [];
			for (var i = 0; i < this.ingredienti.length; i++) {
				ingredientiString.push(this.ingredienti.get(i).get("nome"));
			};
			return ingredientiString.join(", ");
		},

		aggiornaIngrediente: function(i, aggiunto){
			this.ingredienti.get(i).set("aggiunto", aggiunto);
		}
	});

	return Pizza;

});