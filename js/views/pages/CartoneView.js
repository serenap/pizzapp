define(function(require) {

  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");
  var PizzaCartoneSubView = require("views/pages/PizzaCartoneSubView");

  var CartoneView = Utils.Page.extend({

    constructorName: "CartoneView",
    collection: Cartone,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.cartone;
      var pizza1 = new Pizza({
          "quantita": 2,
          "nome": "Bo",
          "ingredienti": ["Bla","Bla","Bla"],
          "prezzo": 8
      });
      var pizza2 = new Pizza({
          "quantita": 1,
          "nome": "Ma",
          "ingredienti": ["Bla","Bla","Bla"],
          "prezzo": 3.5
      });
      var pizza3 = new Pizza({
          "nome": "Bo",
          "ingredienti": ["Bla","Bla","Bla"],
          "prezzo": 4
      });
      this.collection = new Cartone();
      this.collection.push(pizza1);
      this.collection.push(pizza2);
      this.collection.aggiungiPizza(pizza3);
      this.render();
    },

    id: "cartone",
    //className: "i-g page",

    events: {
      "touchend .rimuovi" : "rimuoviPizza"
    },   


     render: function() {
     // load the template

      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));

      var instance = this;

      this.collection.each(function(pizza){
        var pizzaCartoneSV = new PizzaCartoneSubView({model: pizza});
        $(instance.el).find("ul").append(pizzaCartoneSV.el);
      }, this);


      return this;
    },

    rimuoviPizza: function() {

    }

  });

  return CartoneView;

});