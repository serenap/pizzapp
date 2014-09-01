define(function(require) {

  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");

  var IngredientiSubView = Utils.Page.extend({
    constructorName: "IngredientiSubView",
    model: Pizza,
    
    initialize: function() {
      //carica il template precompilato
      this.template = Utils.templates.ingredienti_sub;
      this.render();
      this.mostra();
    },

    id: "personalizza",

    events: {
      "touchend #modifica_ingredienti" : "modifica",
      "touchend #chiudi_popup" : "annulla"
    },   

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    mostra: function() {
      //mostra o nasconde il popup
      if($(this.el).is(':hidden')) {
        $(this.el).show("fast");
      }
      else $(this.el).hide("fast");
    },

    modifica: function() {
      var cartone = new Cartone();
      var pizza = this.model.clone();
      var ingredienti_aggiornati = [];
      //recupera gli ingredienti selezionati
      $(".selezionato:checked").each(function(){
        ingredienti_aggiornati.push($(this).val());
      });
      //imposta la nuova lista di ingredienti nella pizza da inserire nel Cartone
      //e la aggiunge
      pizza.set("ingredienti", ingredienti_aggiornati);
      cartone.aggiungiPizza(pizza);
      //aggiorna il numero di pizze sull'icona del Cartone
      $("#quantita_cartone").html(cartone.getNumeroPizze());
      //?
      document.getElementById("quantita_cartone").className ="quantita_aggiornata";
      setTimeout(function() {
         $("#quantita_cartone").removeClass("quantita_aggiornata");
      },3200);
      
      this.mostra();
      this.remove();
    },

    annulla: function() {
      this.mostra();
      this.remove();
    },

    menu: function(event) {
      //naviga alla pagina del Menu
      Backbone.history.navigate("menu", {
        trigger: true
      });
    }
 
  });

  return IngredientiSubView;

});