define(function(require) {

  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Utils = require("utils");

  var PizzaCartoneSubView = Utils.Page.extend({

    constructorName: "PizzaCartoneSubView",
    model: Pizza,
    
    initialize: function() {
      var instance = this;

      // load the precompiled template
      this.template = Utils.templates.pizza_cartone_sub;
      this.render();
    },

    id: "pizzerie",

    events: {
    },

    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    menu: function(event) {
        Backbone.history.navigate("menu", {
        trigger: true
      });
    }
  
  });

  return PizzaCartoneSubView;

});