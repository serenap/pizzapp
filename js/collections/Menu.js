define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza");

	var Menu = Backbone.Collection.extend({
		constructorName : "Menu",
		model : Pizza,
		url : "js/JSON/mah.JSON"
	});

	return Menu;
});