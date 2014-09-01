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
		
		//se esiste già un utente salvato nel browser lo carica, 
		//altrimenti lo crea
		initialize: function(profilo) {
			if(window.localStorage.getItem("utente"))
				this.carica(profilo);
			else this.salva(false);
		},

		//se l'utente ha scelto di farsi localizzare, lo salva come "non a casa",
		//viceversa se l'utente ha scelto la consegna a casa
		salva: function(non_a_casa) {
			if(non_a_casa)
				window.localStorage.setItem("utente_non_a_casa", JSON.stringify(this));
			else window.localStorage.setItem("utente", JSON.stringify(this));
		},

		//se ci si trova nel profilo, si carica l'utente con indirizzo di casa,
		//altrimenti quello con l'indirizzo trovato con "Cercami"
		carica: function(profilo) {
			if(profilo)
				this.set(JSON.parse(window.localStorage.getItem("utente")));
			else this.set(JSON.parse(window.localStorage.getItem("utente_non_a_casa")));
		},

		//rimuove dal browser entrambi i tipi di utente
		cancella: function() {
			window.localStorage.removeItem("utente");
			window.localStorage.removeItem("utente_non_a_casa");
		},

		//verifica la presenza di tutti i dati utente
		completo: function() {
			return this.get("nome") != "" && 
					this.get("cognome") != "" && 
					this.get("citta") != "" && 
					this.get("via") != "" && 
					this.get("n_civico") != "" && 
					this.get("telefono") != "";
		}
	});

	return Utente;

});