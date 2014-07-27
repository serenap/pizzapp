define(function(require) {

  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");

  var PizzaCartoneSubView = Utils.Page.extend({

    constructorName: "PizzaCartoneSubView",
    model: Pizza,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.pizza_cartone_sub;
      this.render();
    },

    events: {
      "touchend .rimuovi_cartone" : "rimuovi"
    },

    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    rimuovi: function() {
      var cartone = new Cartone();
      var i = _.indexOf(cartone, this.model);
      var quantita_residua = cartone.rimuoviPizza(this.model);
      if(quantita_residua != 0){
        this.model = cartone.at(i);
        this.render();
      }
      else this.remove();
    }
  
  });

  return PizzaCartoneSubView;

});