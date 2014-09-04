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
      var utente = new Utente();
      var pizzeria = new Pizzeria();
      pizzeria.carica();
      utente.carica(utente.get("a_casa"));
      //inizializza, compila e salva l'Ordine
      var nomeCliente = utente.get("nome") + " " + utente.get("cognome");
      var indirizzoCliente = utente.get("via") + " " + utente.get("n_civico") + ", " + utente.get("citta");
      var telefonoCliente = utente.get("telefono");
      var nomePizzeria = pizzeria.get("nome");
      var indirizzoPizzeria = pizzeria.get("indirizzo");
      var telefonoPizzeria = pizzeria.get("telefono");
      var numeroPizze = cartone.getNumeroPizze();
      var totale = cartone.getTotale();
      var orarioConsegna = "20:00";
      var modalitaPagamento = "contanti";
      //imposta i dati nel model
      this.model = new Ordine({
        "nomeCliente": nomeCliente,
        "indirizzoCliente": indirizzoCliente,
        "telefonoCliente": telefonoCliente,
        "nomePizzeria": nomePizzeria,
        "indirizzoPizzeria": indirizzoPizzeria,
        "telefonoPizzeria": telefonoPizzeria,
        "cartone": cartone,
        "numeroPizze": numeroPizze,
        "totale": totale,
        "orarioConsegna": orarioConsegna,
        "modalitaPagamento": modalitaPagamento
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
          $("#content").scrollTop(0);
          var nodes = document.getElementsByTagName('input');
          for(var i = 0; i < nodes.length; i++) {
              nodes[i].disabled = true;
          }
      var opts = {
        lines: 15, //linee da disegnare
        length: 15, //lunghezza delle linee
        width: 5, //spessore delle linee
        radius: 20, //raggio del cerchio interno
        corners: 1, //rotondità degli angoli (0..1)
        shadow: true, //ombra
        hwaccel: true, //accelerazione hardware
      };  
      var target = document.getElementById("spinner_riepilogo");
      var spinner = new Spinner(opts).spin(target);


      var cartone = new Cartone();
      var utente = new Utente(false);
      //recupera orario e modalità di pagamento dalla form
      var orario = this.$el.find("#orario").val();
      var pagamento = this.$el.find(".pagamento:checked").val();
      //imposta i parametri recuperati nel model
      this.model.set({
        "orarioConsegna": orario,
        "modalitaPagamento": pagamento
      });

      
      var instance = this.model;

      //salva l'Ordine e ferma lo spinner, poi svuota il Cartone
      window.setTimeout(function() {
        instance.salva();
        
        //mostra il reminder dell'Ordine Sospeso nella Home
        document.getElementById("info_ordine_sospeso").style.visibility='visible';
        document.getElementById("normal").style.visibility='hidden';
        //naviga alla Home
        Backbone.history.navigate("home", {
          trigger: true
        });
      }, 5000);
      cartone.svuota();
      utente.cancella();

      
    }

  });

  return RiepilogoView;

});