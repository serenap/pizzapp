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
      //carica il template precompilato
      this.template = Utils.templates.cartone;
      //inizializza il Cartone
      this.collection = new Cartone();
      this.render();
    },

    id: "cartone",

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));

      //crea tante PizzaCartoneSubView quanti sono i model nel Cartone
      var instance = this;
      if(this.collection.length != 0) {
        $(this.el).find("#cartone_vuoto").hide();
        this.collection.each(function(model) {
          var pizzaCartoneSV = new PizzaCartoneSubView({model: model});
          $(instance.el).find("ul").append(pizzaCartoneSV.el);
        }, this);
      }

      return this;
    }

  });

  return CartoneView;

});