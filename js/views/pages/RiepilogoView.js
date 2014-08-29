define(function(require) {

  var Backbone = require("backbone");
  var Ordine = require("models/Ordine");
  var Utente = require("models/Utente");
  var Pizzeria = require("models/Pizzeria");
  var Cartone = require("collections/Cartone");
  var Spinner = require("spin");
  var Utils = require("utils"); 

  var RiepilogoView = Utils.Page.extend({

    constructorName: "RiepilogoView",
    model: Ordine,
    
    initialize: function() {
      var cartone = new Cartone();
      var utente = new Utente(false);
      var pizzeria = new Pizzeria(JSON.parse(window.localStorage.getItem("pizzeria")));

      this.model = new Ordine({
        "nomeCliente": utente.get("nome") + " " + utente.get("cognome"),
        "indirizzoCliente": utente.get("via") + ", " + utente.get("n_civico") + ", " + utente.get("citta"),
        "telefonoCliente": utente.get("telefono"),
        "nomePizzeria": pizzeria.get("nome"),
        "indirizzoPizzeria": pizzeria.get("indirizzo"),
        "telefonoPizzeria": pizzeria.get("telefono"),
        "cartone": cartone,
        "numeroPizze": cartone.getNumeroPizze(),
        "totale": cartone.getTotale(),
        "orarioConsegna": "20:00",
        "modalitaPagamento": "contanti"
      });
      this.model.salva();
      
      // load the precompiled template
      this.template = Utils.templates.riepilogo;
    },

    id: "riepilogo",

    events: {
      "touchend #invia_ordine" : "invia"
    },   

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    invia: function() {
      var cartone = new Cartone();
      var orario = this.$el.find("#orario").val();
      var pagamento = this.$el.find(".pagamento:checked").val();
      this.model.set({
        "orarioConsegna": orario,
        "modalitaPagamento": pagamento
      });

      var opts = {
        lines: 15,
        length: 15,
        width: 5,
        radius: 20,
        corners: 1,
        shadow: true,
        hwaccel: true,
      };  
      var target = $("#spinner");
      var spinner = new Spinner(opts).spin(target);
      var instance = this.model;

      setTimeout(function() {
        instance.salva();
        spinner.stop();
      }, 10000);

      document.getElementById("info_ordine_sospeso").style.visibility='visible';
      document.getElementById("normal").style.visibility='hidden';
    }

  });

  return RiepilogoView;

});