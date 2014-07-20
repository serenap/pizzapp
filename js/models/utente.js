define(function(require) {

	var Backbone = require("backbone");

	var Utente = Backbone.Model.extend({
		constructorName: "Utente",
		default:{
			nome: '',
			cognome:'',
			citta: '',
			via:'',
			n_civico: '',
			telefono:''
		},
		
		initialize: function(){
			alert("Welcome");
		},
	});

	return Utente;

});