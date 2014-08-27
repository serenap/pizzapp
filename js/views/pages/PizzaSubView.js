define(function(require) {
  
  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Cartone = require("collections/Cartone");
  var IngredientiSubView = require("views/pages/IngredientiSubView");
  var Utils = require("utils");

  var PizzaSubView = Utils.Page.extend({

    constructorName: "PizzaSubView",
    model: Pizza,
    
    initialize: function() {
      // load the precompiled template
      /*var cartone = new Cartone();
      cartone.on("add", function(){
        this.$el.find("#quantity").html(cartone.getNumeroPizze());
        console.log("Oh");
      });*/
      this.template = Utils.templates.pizza_sub;
      this.render();
    },

    events: {
      "touchend .mostra": "mostra",
      "touchend .personalizza" : "personalizza",
      "touchend .aggiungi" : "aggiungi"
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      var categoria = this.model.toJSON().categoria;
      if(categoria=='Rossa'){
        this.$("#imgpizza_bianca").hide("fast");
      }else{
        this.$("#imgpizza_rossa").hide("fast");
      }
      return this;
    },

    mostra: function() {
      if(!(this.$(".displaynone").is(':hidden'))){    
        this.$(".displaynone").hide();
        this.$(".anteprima").show();
      } else {
        this.$(".displaynone").show();
        this.$(".anteprima").hide();
      }
    },

    aggiungi: function() {
      var cartone = new Cartone();
      cartone.aggiungiPizza(this.model);
      $("#quantita_cartone").html(cartone.getNumeroPizze());
    },

    personalizza: function() {
      var cartone = new Cartone();
      var ingredientiSV = new IngredientiSubView({model: this.model});
      $(this.el).parent().append(ingredientiSV.el);
      $("#quantita_cartone").html(cartone.getNumeroPizze());
      this.mostra();
    }
 
  });

  return PizzaSubView;

});