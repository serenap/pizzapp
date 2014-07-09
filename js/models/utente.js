define(function(require) {

	var Backbone = require("backbone");

	utente = Backbone.Model.extend({
		constructorName: "utente",
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

});