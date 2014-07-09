define(function(require) {

	var Backbone = require("backbone");

	var Pizzeria = Backbone.Model.extend({
		constructorName: "Pizzeria",
		default:{
			nome: '',
			indirizzo:'',
			telefono: '',
			immagine: undefined,
			listino: [], //array di oggetti "pizza"
			maxDistanza: 0, //massma distanza di consegna
			giorniApertura: [],
			orarioApertura: []

		},

		initialize: function(){
		},
	});

	return Pizzeria;

});