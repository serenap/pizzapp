define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza");

	var Pizzeria = Backbone.Model.extend({
		constructorName: "Pizzeria",
		default:{
			nome: '',
			indirizzo:'',
			telefono: '',
			immagine: undefined,
			listino: [], //array di oggetti "pizza"
			maxDistanza: 0, //massima distanza di consegna
			giorniApertura: [],
			orarioApertura: []

		},

		aperta: function(){
//			var data = new Date();
//			var giorno=data.getDay();
//			var ora=data.getHours()+":"+(data.getMinutes()<10?'0':'') + data.getMinutes();
		}
	});

	return Pizzeria;

});