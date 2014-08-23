define(function(require) {

	var Backbone = require("backbone");
	var Pizza = require("models/Pizza");

	var Menu = Backbone.Collection.extend({
		constructorName : "Menu",
		model : Pizza,
		url : "",

		initialize: function(url) {
			this.url = url;
		}
	});

	return Menu;
});