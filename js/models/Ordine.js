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

		salva: function() {
			window.localStorage.setItem("ordine", JSON.stringify(this));
		},

		carica: function() {
			this.set(JSON.parse(window.localStorage.getItem("ordine")));
		},

		cancella: function() {
			window.localStorage.removeItem("ordine");
		},

		countdown: function() {
			var instance = this;
			window.setTimeout(function() {
				instance.destroy({
					success: function() {
						window.localStorage.removeItem("ordine");
						console.log("Ordine scaduto");
					}
				});
			}, 30000);
		}
	});

	return Ordine;

});