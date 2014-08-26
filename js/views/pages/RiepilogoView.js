define(function(require) {

  var Backbone = require("backbone");
  var Ordine = require("models/Ordine");
  var Utente = require("models/Utente");
  var Pizzeria = require("models/Pizzeria");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");

  var RiepilogoView = Utils.Page.extend({
    constructorName: "RiepilogoView",
    collection: Cartone,
    model: Ordine,
    
    initialize: function() {
      this.collection = new Cartone();
      var utente = new Utente();
      var pizzeria = new Pizzeria(JSON.parse(window.localStorage.getItem("pizzeria")));

      this.model = new Ordine({
        "nomeCliente": utente.get("nome"),
        "indirizzoCliente": utente.get("via") + ", " + utente.get("n_civico") + ", " + utente.get("citta"),
        "telefonoCliente": utente.get("telefono"),
        "nomePizzeria": pizzeria.get("nome"),
        "indirizzoPizzeria": pizzeria.get("indirizzo"),
        "telefonoPizzeria": pizzeria.get("telefono"),
        "cartone": JSON.stringify(this.collection),
        "numeroPizze": this.collection.getNumeroPizze(),
        "totale": this.collection.getTotale(),
        "orarioConsegna": '',
        "modalitaPagamento": ''
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
      var orario = this.$el.find("#orario").val();
      var pagamento = this.$el.find(".pagamento:checked").val();
      this.model.set({
        "orarioConsegna": orario,
        "modalitaPagamento": pagamento
      });
      this.model.salva();
      this.collection.svuota();
      $("#quantita_cartone").html(this.collection.getNumeroPizze());
      this.model.countdown();
      this.remove();
    }

  });

  return RiepilogoView;

});