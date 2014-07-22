define(function(require) {

	var Backbone = require("backbone");
	var Menu = require("collections/Menu");

	var Pizzeria = Backbone.Model.extend({
		constructorName: "Pizzeria",
		default:{
			nome: '',
			indirizzo:'',
			telefono: '',
			immagine: null,
			menu: null,
			maxDistanza: 0,
			giorniApertura: [],
			orarioApertura: []

		},

		initialize: function(){
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