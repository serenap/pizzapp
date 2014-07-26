define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza");

	var Menu = Backbone.Collection.extend({
		constructorName : "Menu",
		model : Pizza,
		pizzeria : "",
		url : "js/JSON/mah.JSON",

		setUrl: function(pizzeria){
			this.set("url", "js/JSON/" + pizzeria + ".JSON");
		}
	});

	return Menu;
});