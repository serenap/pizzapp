define(function(require) {

  
  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var IngredientiSubView = require("views/pages/IngredientiSubView");
  var Utils = require("utils");
 

  var PizzaSubView = Utils.Page.extend({

    constructorName: "PizzaSubView",
    model: Pizza,
    
    initialize: function() {
      //var instance = this;

      // load the precompiled template
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

    },

    personalizza: function() {
      var ingredientiSV = new IngredientiSubView({model: this.model});
      $(this.el).parent().append(ingredientiSV.el);
    }
 
  });

  return PizzaSubView;

});