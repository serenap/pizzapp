define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza");

	var Cartone = Backbone.Collection.extend({
		constructorName : "Cartone",
		model : Pizza,

		//alla creazione del cartone, controlla se esista già nel browser
		initialize: function(){
			if(window.localStorage.getItem("cartone"))
				this.carica();
		},

		//salva lo stato corrente del cartone nel browser
		salva: function(){
			window.localStorage.setItem("cartone", JSON.stringify(this));
			this.carica();
		},

		//carica dal browser lo stato del cartone
		carica: function(){
			this.reset();
			this.set(JSON.parse(window.localStorage.getItem("cartone")));
		},

		//rimuove tutti i model dal cartone e lo rimuove dal browser
		svuota: function(){
			this.reset();
			window.localStorage.removeItem("cartone");
		},

		//aggiunge un nuovo model al cartone se la pizza non è presente, 
		//ne aumenta la quantità se presente
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
					pizza.set("prezzo", nuovo_prezzo.toFixed(2));
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

		//rimuove un model dal cartone o ne diminuisce la quantita a seconda 
		//se ci siano una o più pizze dello stesso tipo
		rimuoviPizza: function(pizza){
			var nome_pizza = pizza.get("nome");
			var ingredienti_pizza = JSON.stringify(pizza.get("ingredienti"));
			var prezzo_pizza = pizza.get("prezzo");
			var nuova_quantita = 0;
			var indice = null;
			var rimuovi = false;

			this.each(function(model, index) {
				var quantita = model.get("quantita");
				var nome = model.get("nome");
				var prezzo = model.get("prezzo");
				var ingredienti = JSON.stringify(model.get("ingredienti"));

				if(nome == nome_pizza && ingredienti == ingredienti_pizza) {
					if(quantita > 1) {
						nuova_quantita = quantita-1;
						model.set("quantita", nuova_quantita);
						model.set("prezzo", ((prezzo/quantita)*nuova_quantita).toFixed(2));
					}
					else {
						rimuovi = true;
					};
					indice = index;
				}
			});
			if(rimuovi == true) {
				this.remove(this.at(indice));
				this.salva();
				return null;
			}

			this.salva();
			return this.at(indice);
		},

		//restituisce il numero complessivo di pizze nel cartone
		getNumeroPizze: function() {
			var count = 0;
			this.each(function(model) {
				count += model.get("quantita");
			});
			return count;
		},

		//restituisce il prezzo complessivo delle pizze nel cartone
		getTotale: function() {
			var totale = 0;
			this.each(function(model) {
				totale += parseFloat(model.get("prezzo"));
			});
			return totale.toFixed(2);
		}

	});

	return Cartone;
});