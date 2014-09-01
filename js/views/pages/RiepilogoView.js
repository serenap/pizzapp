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
      //carica Cartone, Utente e Pizzeria scelta
      var cartone = new Cartone();
      var utente = new Utente(false);
      var pizzeria = new Pizzeria();
      pizzeria.carica();
      //inizializza, compila e salva l'Ordine
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
      
      //carica il template precompilato
      this.template = Utils.templates.riepilogo;
    },

    id: "riepilogo",

    events: {
      "touchend #invia_ordine" : "invia"
    },   

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    invia: function() {
      var cartone = new Cartone();
      //recupera orario e modalità di pagamento dalla form
      var orario = this.$el.find("#orario").val();
      var pagamento = this.$el.find(".pagamento:checked").val();
      //imposta i parametri recuperati nel model
      this.model.set({
        "orarioConsegna": orario,
        "modalitaPagamento": pagamento
      });

      var opts = {
        lines: 15, //linee da disegnare
        length: 15, //lunghezza delle linee
        width: 5, //spessore delle linee
        radius: 20, //raggio del cerchio interno
        corners: 1, //rotondità degli angoli (0..1)
        shadow: true, //ombra
        hwaccel: true, //accelerazione hardware
      };  
      var target = $("#spinner");
      var spinner = new Spinner(opts).spin(target);
      var instance = this.model;

      //salva l'Ordine e ferma lo spinner, poi svuota il Cartone
      window.setTimeout(function() {
        instance.salva();
        spinner.stop();
      }, 10000);
      cartone.svuota();

      //mostra il reminder dell'Ordine Sospeso nella Home
      document.getElementById("info_ordine_sospeso").style.visibility='visible';
      document.getElementById("normal").style.visibility='hidden';
    }

  });

  return RiepilogoView;

});