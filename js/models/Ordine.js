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
		url: "",

		salva: function() {
			window.localStorage.setItem("ordine", JSON.stringify(this));
		},

		carica: function() {
			if(window.localStorage.getItem("ordine")) {
				this.set(JSON.parse(window.localStorage.getItem("ordine")));
				return true;
			}
			return false;
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