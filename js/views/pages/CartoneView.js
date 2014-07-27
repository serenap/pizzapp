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
      this.collection = new Cartone();
      this.render();
    },

    id: "cartone",

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
    }

  });

  return CartoneView;

});