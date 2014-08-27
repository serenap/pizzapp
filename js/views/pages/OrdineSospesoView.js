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
      var cartone = new Cartone();
      cartone.svuota();
      $("#quantita_cartone").html(cartone.getNumeroPizze());

      // load the precompiled template
      this.template = Utils.templates.ordine_sospeso;
      this.model = new Ordine();
      this.model.carica();
    },

    id: "ordine_sospeso",

    events: {
      "touchend #archivia" : "archivia"
    },   

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      document.getElementById("info_ordine_sospeso").style.visibility='hidden';
      document.getElementById("normal").style.visibility='visible';
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    archivia: function() {
      this.model.cancella();
      Backbone.history.navigate("home", {
        trigger: true
      });
    }

  });

  return OrdineSospesoView;

});