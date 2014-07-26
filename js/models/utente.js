define(function(require) {

	var Backbone = require("backbone");

	var Utente = Backbone.Model.extend({
		constructorName: "Utente",
		defaults:{
			nome: '',
			cognome: '',
			citta: '',
			via: '',
			n_civico: '',
			telefono: ''
		},
		
		initialize: function(){
			this.salva();
		},

		salva: function(){
			window.localStorage.setItem("utente", JSON.stringify(this));
		},

		carica: function(){
			this.set(JSON.parse(window.localStorage.getItem("utente")));
		}
	});

	return Utente;

});