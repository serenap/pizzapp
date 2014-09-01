define(function(require) {

	var Backbone = require("backbone");
	var Menu = require("collections/Menu");

	var Pizzeria = Backbone.Model.extend({
		constructorName: "Pizzeria",
		defaults: {
			nome: '',
			indirizzo:'',
			telefono: '',
			immagine: null,
			menu: null,
			maxDistanza: 0,
			giorniChiusura: [],
			orarioApertura: []
		},

		//ad ogni indice corrisponde una stringa per il giorno settimanale
		mappaGiorni: [
			"Domenica",
			"Lunedì",
			"Martedì",
			"Mercoledì",
			"Giovedì",
			"Venerdì",
			"Sabato"
		],

		//verifica se la pizzeria è aperta nel momento dell'invocazione
		aperta: function(){
			var data = new Date();
			return this.get("giorniChiusura").indexOf(this.mappaGiorni[data.getDay()]) == -1 && 
					data.getHours() >= this.get("orarioApertura")[0] && 
					data.getHours() <= this.get("orarioApertura")[1];
		},

		//restiuisce il numero corrispondente al giorno di chiusura
		riposoSettimanale: function(){
			var data = new Date();
			return this.get("giorniChiusura").indexOf(this.mappaGiorni[data.getDay()]) == -1;
		}
	});

	return Pizzeria;

});