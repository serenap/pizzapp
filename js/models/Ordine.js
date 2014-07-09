define(function(require) {

	var Backbone = require("backbone");

	var Ordine = Backbone.Model.extend({
		constructorName: "Ordine",
		default:{
			nomeCliente: '',
			indirizzoCliente: '',
			telefonoCliente: '',
			nomePizzeria: '',
			indirizzoPizzeria: '',
			telefonoPizzeria: '',
			numeroPizze: 0,
			totale: 0,
			orarioConsegna: '',
			modalitaPagamento: ''
		}
	});

	return Ordine;

});