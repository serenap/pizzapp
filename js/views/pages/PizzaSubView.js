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
      //carica il template precompilato
      this.template = Utils.templates.pizza_sub;
      this.render();
    },

    events: {
      "touchend .mostra": "mostra",
      "touchend .personalizza" : "personalizza",
      "touchend .aggiungi" : "aggiungi"
    },

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));

      //mostra l'immagine della Pizza a seconda della categoria
      var categoria = this.model.get("categoria");
      if(categoria=='Rossa')
        this.$(".imgpizza_bianca").hide("fast");
      else this.$(".imgpizza_rossa").hide("fast");

      return this;
    },

    mostra: function() {
      //mostra o nasconde il blocco per la personalizzazione
      if(!(this.$(".displaynone").is(':hidden'))) {    
        this.$(".displaynone").hide();
        this.$(".anteprima").show();
      }
      else {
        this.$(".displaynone").show();
        this.$(".anteprima").hide();
      }
    },

    aggiungi: function() {
      //aggiunge la Pizza al Cartone
      var cartone = new Cartone();
      cartone.aggiungiPizza(this.model);
      //aggiorna il numero di pizze sull'icona del Cartone
      $("#quantita_cartone").html(cartone.getNumeroPizze());
      //?
      document.getElementById("quantita_cartone").className ="quantita_aggiornata";
      setTimeout(function() {
         $("#quantita_cartone").removeClass("quantita_aggiornata");
      },3200);
    },

    personalizza: function() {
      //inizializza una IngredientiSubView per la Pizza scelta
      var cartone = new Cartone();
      var ingredientiSV = new IngredientiSubView({model: this.model});
      $(this.el).parent().append(ingredientiSV.el);

      this.mostra();
    }
 
  });

  return PizzaSubView;

});