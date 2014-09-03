define(function(require) {

	var Backbone = require("backbone");

	var Utente = Backbone.Model.extend({
		constructorName: "Utente",
		defaults: {
			nome: '',
			cognome: '',
			citta: '',
			lat: '',
			lng: '',
			via: '',
			n_civico: '',
			telefono: '',
			a_casa: true
		},
		
		//se non esiste già un Utente salvato nel browser lo crea, 
		//poi imposta se sia a casa o meno
		initialize: function() {
			if(!window.localStorage.getItem("utente"))
				this.salva(true);
			if(window.localStorage.getItem("utente_non_a_casa"))
				this.set("a_casa", false);
		},

		//se l'Utente ha scelto di farsi localizzare, lo salva come "non a casa",
		//viceversa se ha scelto la consegna a casa
		salva: function(a_casa) {
			if(a_casa)
				window.localStorage.setItem("utente", JSON.stringify(this));
			else window.localStorage.setItem("utente_non_a_casa", JSON.stringify(this));
		},

		//se ci si trova nel profilo, si carica l'utente con indirizzo di casa,
		//altrimenti quello con l'indirizzo trovato con "Cercami"
		carica: function(a_casa) {
			if(a_casa)
				this.set(JSON.parse(window.localStorage.getItem("utente")));
			else this.set(JSON.parse(window.localStorage.getItem("utente_non_a_casa")));
			this.set("a_casa", a_casa);
		},

		//rimuove dal browser l'Utente non a casa
		cancella: function() {
			if(window.localStorage.getItem("utente_non_a_casa"))
				window.localStorage.removeItem("utente_non_a_casa");
		},

		//verifica la presenza di tutti i dati Utente
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