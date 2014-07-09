define(function(require) {

	var Backbone = require("backbone");

	pizzeria = Backbone.Model.extend({
		constructorName: "pizzeria",
		default:{
			nome: '',
			indirizzo:'',
			telefono: '',
			listino: [], //array di oggetti "pizza"
			zone: [], //elenco di vie/quartieri coperti dalla pizzeria
			giorni_chiusura: [],
			orario: ''

		},

		initialize: function(){
		},
	});

});