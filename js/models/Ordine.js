define(function(require) {

	var Backbone = require("backbone");

	var Ordine = Backbone.Model.extend({
		constructorName: "Ordine",
		default: {
			nomeCliente: '',
			indirizzoCliente: '',
			telefonoCliente: '',
			nomePizzeria: '',
			indirizzoPizzeria: '',
			telefonoPizzeria: '',
			cartone: '',
			numeroPizze: 0,
			totale: 0,
			orarioConsegna: '',
			modalitaPagamento: ''
		},

		initialize: function() {
			window.setTimeout(this.destroy({
				success: function() {
					window.localStorage.removeItem("ordine");
				}
			}), 30000);
		}
	});

	return Ordine;

});