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
			var data = new Date();
			return data.getDay() >= this.giorniApertura[0] && 
					data.getDay() <= this.giorniApertura[1] && 
					data.getHours() >= this.orarioApertura[0] && 
					data.getHours() <= this.orarioApertura[1];
		}
	});

	return Pizzeria;

});