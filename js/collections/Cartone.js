define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza");

	var Cartone = Backbone.Collection.extend({
		constructorName : "Cartone",
		model : Pizza,

		initialize: function(){
			if(window.localStorage.getItem("cartone"))
				this.carica();
			//else this.salva();
		},

		salva: function(){
			window.localStorage.setItem("cartone", JSON.stringify(this));
			this.carica();
		},

		carica: function(){
			this.reset();
			this.set(JSON.parse(window.localStorage.getItem("cartone")));
		},

		svuota: function(){
			this.reset();
			window.localStorage.removeItem("cartone");
		},

		aggiungiPizza: function(nuova_pizza){
			var presente = false;
			var i = 0;
			var nome_nuova_pizza = nuova_pizza.get("nome");
			var ingredienti_nuova_pizza = JSON.stringify(nuova_pizza.get("ingredienti"));
			var prezzo_nuova_pizza = nuova_pizza.get("prezzo");

			while(!presente && i<this.length){
				var pizza = this.at(i);
				var quantita = pizza.get("quantita");
				var nome = pizza.get("nome");
				var ingredienti = JSON.stringify(pizza.get("ingredienti"));

				if(nome == nome_nuova_pizza && 
					ingredienti == ingredienti_nuova_pizza){
					quantita++;
					var nuovo_prezzo = parseFloat(prezzo_nuova_pizza)*quantita;

					pizza.set("quantita", quantita);
					pizza.set("prezzo", nuovo_prezzo);
					presente = true;
				}
				i++;
			}
			if(!presente){
				nuova_pizza.set({"quantita": 1});
				this.push(nuova_pizza);
			}
			this.salva();
		},

		rimuoviPizza: function(pizza){
			//this.remove(pizza, this.salva());
			var nome_pizza = pizza.get("nome");
			var ingredienti_pizza = JSON.stringify(pizza.get("ingredienti"));
			var prezzo_pizza = pizza.get("prezzo");
			var nuova_quantita = 0;
			var indice = null;

			this.each(function(model, index) {
				var quantita = model.get("quantita");
				var nome = model.get("nome");
				var prezzo = model.get("prezzo");
				var ingredienti = JSON.stringify(model.get("ingredienti"));

				if(nome == nome_pizza && ingredienti == ingredienti_pizza) {
					if(quantita > 1) {
						nuova_quantita = quantita-1;
						model.set("quantita", nuova_quantita);
						model.set("prezzo", (prezzo/quantita)*nuova_quantita);
					}
					else {
						nuova_quantita = 0;
						indice = index;
					};
				}
			});
			if(indice != null)
				this.remove(this.at(indice));

			this.salva();
			return nuova_quantita;
		}

	});

	return Cartone;
});