define(function(require) {

  var Backbone = require("backbone");
  var Ordine = require("models/Ordine");
  var Utente = require("models/Utente");
  var Pizzeria = require("models/Pizzeria");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils"); 

  var OrdineSospesoView = Utils.Page.extend({

    constructorName: "OrdineSospesoView",
    model: Ordine,
    
    initialize: function() {
      //inizializza il Cartone e lo svuota
      var cartone = new Cartone();
      cartone.svuota();
      //aggiorna il numero di pizze sull'icona del Cartone
      $("#quantita_cartone").html(cartone.getNumeroPizze());

      //carica il template precompilato
      this.template = Utils.templates.ordine_sospeso;
      //inizializza l'Ordine e lo carica
      this.model = new Ordine();
      this.model.carica();
    },

    id: "ordine_sospeso",

    events: {
      "touchend #archivia" : "archivia"
    },   

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //mostra l'Ordine Sospeso
      document.getElementById("info_ordine_sospeso").style.visibility='hidden';
      document.getElementById("normal").style.visibility='visible';
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    archivia: function() {
      //cancella l'Ordine e torna alla Home
      this.model.cancella();
      Backbone.history.navigate("home", {
        trigger: true
      });
    }

  });

  return OrdineSospesoView;

});