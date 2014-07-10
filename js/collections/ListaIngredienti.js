define(function(require) {

	var Backbone = require("backbone");
	var Ingrediente = require("models/Ingrediente");

	var ListaIngredienti = Backbone.Collection.extend({
		constructorName : "ListaIngredienti",
		model : Ingrediente
	});

	return ListaIngredienti;
});