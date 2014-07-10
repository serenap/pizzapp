define(function(require) {

	var Backbone = require("backbone");

	var Utente = Backbone.Model.extend({
		constructorName: "Utente",
		default:{
			nome: '',
			indirizzo: '',
			telefono: '',
			posizione: '',
			carta: ''
		}
	});

	return Utente;

});