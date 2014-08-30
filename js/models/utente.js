define(function(require) {

	var Backbone = require("backbone");

	var Utente = Backbone.Model.extend({
		constructorName: "Utente",
		defaults: {
			nome: '',
			cognome: '',
			citta: '',
			via: '',
			n_civico: '',
			telefono: ''
		},
		
		initialize: function(profilo) {
			if(window.localStorage.getItem("utente"))
				this.carica(profilo);
			else this.salva(false);
		},

		salva: function(non_a_casa) {
			if(non_a_casa)
				window.localStorage.setItem("utente_non_a_casa", JSON.stringify(this));
			else window.localStorage.setItem("utente", JSON.stringify(this));
		},

		carica: function(profilo) {
			if(profilo)
				this.set(JSON.parse(window.localStorage.getItem("utente")));
			else this.set(JSON.parse(window.localStorage.getItem("utente_non_a_casa")));
		},

		completo: function() {
			return this.nome != "" && 
					this.cognome != "" && 
					this.citta != "" && 
					this.via != "" && 
					this.n_civico != "" && 
					this.telefono != "";
		}
	});

	return Utente;

});