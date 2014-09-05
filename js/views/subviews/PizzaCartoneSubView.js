define(function(require) {

  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");

  var PizzaCartoneSubView = Backbone.View.extend({

    constructorName: "PizzaCartoneSubView",
    model: Pizza,
    
    initialize: function() {
      //carica il template precompilato
      this.template = Utils.templates.pizza_cartone_sub;
      this.render();
    },

    events: {
      "touchend .rimuovi_cartone" : "rimuovi"
    },

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    rimuovi: function() {
      //rimuove la Pizza dal Cartone
      var cartone = new Cartone();
      pizza_aggiornata = cartone.rimuoviPizza(this.model);
      //se la Pizza era presente in quantità maggiore di 1 allora 
      //aggiorna la view
      if(pizza_aggiornata != null) {
        this.model = pizza_aggiornata;
        this.render();
      }
      else {
        //se il Cartone si è svuotato, notifica l'Utente e nasconde 
        //l'icona del riepilogo
        if(cartone.length == 0) {
          $(this.el).parent().find("#cartone_vuoto").show("fast");
          $("#riepilogo").hide("fast");
        }
        this.remove();
      }
      //aggiorna il numero di pizze sull'icona del Cartone
      $("#quantita_cartone").html(cartone.getNumeroPizze());
    }
  
  });

  return PizzaCartoneSubView;

});