define(function(require) {

	var Backbone = require("backbone");

	var Cartone = Backbone.Model.extend({
		constructorName: "Cartone",
		default:{
			pizze: {
				quantita: 0,
				nome: '',
				ingredienti: ''
			}
			
		}
	});

	return Cartone;

});