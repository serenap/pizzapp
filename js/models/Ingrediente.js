define(function(require) {

	var Backbone = require("backbone");

	var Ingrediente = Backbone.Model.extend({
		constructorName: "Ingrediente"
		defaults: {
			nome: "",
			aggiunto: true
		}
	});

	return Ingrediente;
});