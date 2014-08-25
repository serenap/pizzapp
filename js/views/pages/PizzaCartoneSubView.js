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

      pizza_aggiornata = cartone.rimuoviPizza(this.model);
      if(pizza_aggiornata != null) {
        this.model = pizza_aggiornata;
        this.render();
      }
      else {
        if(cartone.length == 0)
          $(this.el).parent().find("#cartone_vuoto").show("fast");
        this.remove();
      }
      $("#quantita_cartone").html(cartone.getNumeroPizze());
    }
  
  });

  return PizzaCartoneSubView;

});