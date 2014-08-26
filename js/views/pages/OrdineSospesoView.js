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
      var utente = new Utente();
      var pizzeria = new Pizzeria(JSON.parse(window.localStorage.getItem("pizzeria")));

      this.model = new Ordine({
        "nomeCliente": utente.get("nome"),
        "indirizzoCliente": utente.get("via") + ", " + utente.get("n_civico") + ", " + utente.get("citta"),
        "telefonoCliente": utente.get("telefono"),
        "nomePizzeria": pizzeria.get("nome"),
        "indirizzoPizzeria": pizzeria.get("indirizzo"),
        "telefonoPizzeria": pizzeria.get("telefono"),
        "cartone": cartone,
        "numeroPizze": cartone.getNumeroPizze(),
        "totale": cartone.getTotale(),
        "orarioConsegna": '',
        "modalitaPagamento": ''
      });
      window.localStorage.setItem("ordine", JSON.stringify(this.model));
      
      // load the precompiled template
      this.template = Utils.templates.ordineSospeso;
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
      
      Backbone.history.navigate("home", {
        trigger: true
      });
    }

  });

  return OrdineSospesoView;

});