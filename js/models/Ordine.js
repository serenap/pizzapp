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

		//salva lo stato corrente dell'ordine nel browser
		salva: function() {
			window.localStorage.setItem("ordine", JSON.stringify(this));
		},

		//se è già presente un salvataggio nel browser, carica l'ordine
		carica: function() {
			if(window.localStorage.getItem("ordine")) {
				this.set(JSON.parse(window.localStorage.getItem("ordine")));
				return true;
			}
			return false;
		},

		//cancella l'oggetto e rimuove l'ordine dal browser
		cancella: function() {
			this.clear();
			window.localStorage.removeItem("ordine");
		},

		/*countdown: function() {
			var instance = this;
			window.setTimeout(function() {
				instance.destroy({
					success: function() {
						window.localStorage.removeItem("ordine");
					}
				});
			}, 30000);
		}*/
	});

	return Ordine;

});