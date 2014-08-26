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

		mappaGiorni: [
			"Domenica",
			"Lunedì",
			"Martedì",
			"Mercoledì",
			"Giovedì",
			"Venerdì",
			"Sabato"
		],

		initialize: function(){
		},

		aperta: function(){
			var data = new Date();
			return this.get("giorniChiusura").indexOf(this.mappaGiorni[data.getDay()]) == -1 && 
					data.getHours() >= this.get("orarioApertura")[0] && 
					data.getHours() <= this.get("orarioApertura")[1];
		},

		riposoSettimanale: function(){
			var data = new Date();
			return this.get("giorniChiusura").indexOf(this.mappaGiorni[data.getDay()]) == -1;
		}
	});

	return Pizzeria;

});