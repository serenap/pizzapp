define(function(require) {

	var Backbone = require("backbone");
	var Pizzeria = require("models/Pizzeria");

	var ListaPizzerie = Backbone.Collection.extend({
		constructorName : "ListaPizzerie",
		model : Pizzeria,
		url : "JSON/"
	});

	return ListaPizzerie;
});