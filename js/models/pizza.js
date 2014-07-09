define(function(require) {

	var Backbone = require("backbone");

	var Pizza = Backbone.Model.extend({
		constructorName: "Pizza",
		default:{
			nome: '',
			categoria: '',
			immagine: undefined,
			ingredienti: [],
			prezzo: 0
			
		},

		initialize: function(){
		},
	});

	return Pizza;

});