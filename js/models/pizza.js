define(function(require) {

	var Backbone = require("backbone");

	pizza = Backbone.Model.extend({
		constructorName: "pizza",
		default:{
			nome: '',
			tipo:'',
			prezzo:''
			
		},
		initialize: function(){
		},
	});

});