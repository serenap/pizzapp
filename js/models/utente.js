define(function(require) {

	var Backbone = require("backbone");

	var Utente = Backbone.Model.extend({
		constructorName: "Utente",
		default:{
			nome: '',
/*			cognome:'',
			citta: '',
			via:'',
			n_civico: '',*/
			indirizzo: '',
			telefono: '',
			posizione: '',
			carta: ''
		}
	});

	return Utente;

});