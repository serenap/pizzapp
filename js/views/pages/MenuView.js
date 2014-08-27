define(function(require) {

  var Backbone = require("backbone");
  var Pizzeria = require("models/Pizzeria");
  var Menu = require("collections/Menu");
  var Cartone = require("collections/Cartone");
  var PizzaSubView = require("views/pages/PizzaSubView");
  var Utils = require("utils");

  var MenuView = Utils.Page.extend({

    constructorName: "MenuView",
    collection: Menu,
    
    initialize: function() {
      var instance = this;
      var pizzeria = new Pizzeria(JSON.parse(window.localStorage.getItem("pizzeria")));
      var url = "js/JSON/" + pizzeria.get("nome") + ".JSON";

      // load the precompiled template
      this.template = Utils.templates.menu;
      this.collection = new Menu(url);
      this.collection.fetch({success: function(collection) {
          instance.render();
        }
      });
    },

    id: "menu", 

    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));

      var instance = this;
      var cartone = new Cartone();

      $("#quantita_cartone").html(cartone.getNumeroPizze());
      var pizzeria = new Pizzeria(JSON.parse(window.localStorage.getItem("pizzeria")));
      document.getElementById("subtitle").innerHTML = 'pizzeria '+ pizzeria.get("nome");
      this.collection.each(function(pizza) {
        var pizzaSV = new PizzaSubView({model: pizza});
        var pizzaSVall = new PizzaSubView({model: pizza});
        var categoria = pizzaSV.model.toJSON().categoria;

        $(instance.el).find("#tutte").append(pizzaSVall.el);
          
        if(categoria == 'Rossa'){
          $(instance.el).find("#rosse").append(pizzaSV.el);
        }         
        if(categoria == 'Bianca'){
          $(instance.el).find("#bianche").append(pizzaSV.el);
        }
      }, this);

      return this;
    }
   
  });

  return MenuView;

});