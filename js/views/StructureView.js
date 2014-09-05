define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");
  var PromptView = require("views/PromptView");
  var Utente = require("models/Utente");
  var Ordine = require("models/Ordine");

  var StructureView = Backbone.View.extend({
    constructorName: "StructureView",
    collection: Cartone,
    id: "main",
    ordine: null,

    events: {
      "touchend #back": "back",
      "touchend #nav1": "ordina",
      "touchend #nav2": "profilo",
      "touchend #cartone": "cartone",
      "touchend #riepilogo": "riepilogo",
      "touchend #dettaglio_ordine_sospeso": "ordine_sospeso",
      "touchend #ordine_ricevuto": "distruggi_ordine"
    },

    initialize: function() {
      //inizializza Cartone
      this.collection = new Cartone();
      //resetta l'Utente non a casa
      var utente = new Utente();
      utente.cancella();
      //carica il template precompilato
      this.template = Utils.templates.structure;
      //lega l'evento "backbutton" alla funzione "back()"
      var instance = this;
      document.addEventListener("backbutton", instance.back, true);
    },

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];

      return this;
    },

    ordina: function() {
      //se l'utente arriva dal profilo, torna indietro e imposta la tab 
      //"Ordina" come attiva
      if(Backbone.history.fragment == "profilo") {
        Backbone.history.history.back();
        this.setActiveTabBarElement("nav1");
      }
    },

    back: function() {
      //se si usa il backbutton per tornare indietro, this punterà a un 
      //oggetto "Channel", quindi inizializza una nuova StructureView
      if(typeof this != StructureView)
        var instance = new StructureView();
      else instance = this;

      //la pagina alla quale tornare indietro è decisa a seconda di quella 
      //da cui si proviene
      switch(Backbone.history.fragment) {
        //esce dall'applicazione
        case "home":
          if($("#local").is(":visible"))
            $("#local").hide("fast");
          else navigator.app.exitApp();
          break;
        //torna alla Home
        case "pizzerie":
          instance.home();
          break;
        //torna alla pagina delle Pizzerie
        case "menu":
          instance.pizzerie();
          break;
        //nasconde il popup di personalizzazione
        case "personalizza":
          $("#local").hide("fast");
        //torna semplicemente indietro
        case "cartone":
          Backbone.history.history.back();
          break;
        //cancella l'Ordine creato e torna indietro
        case "riepilogo":
          var ordine = new Ordine();
          if(ordine.carica())
            ordine.cancella();
          Backbone.history.history.back();
          break;
        //torna indietro ma mantiene il reminder in cima alla pagina
        case "ordine_sospeso":
          document.getElementById("info_ordine_sospeso").style.visibility='visible';
          document.getElementById("normal").style.visibility='hidden';
          Backbone.history.history.back();
          break;
        //torna indietro e imposta la tab "Ordina" come attiva
        case "profilo":
          Backbone.history.history.back();
          instance.setActiveTabBarElement("nav1");
          break;
      }
    },

    setActiveTabBarElement: function(elementId) {
      //in qualsiasi momento solo una delle due tab è attiva
      document.getElementsByClassName("active")[0].classList.remove("active");
      document.getElementById(elementId).classList.add("active");
    },

    pizzerie: function(event) {
      var cartone = this.collection;
      //se il Cartone non è vuoto chiede se svuotarlo per cambiare pizzeria 
      //o se mantenerlo e continuare l'ordine
      if(cartone.length != 0) {
        var messaggio = "Cambiando pizzeria dovrai svuotare il tuo Cartone. Vuoi continuare?";
        var conferma = function() {
          cartone.svuota();
          $("#quantita_cartone").html(cartone.getNumeroPizze());
          Backbone.history.navigate("pizzerie", {
            trigger: true
          });
        };
        var prompt = new PromptView({
          message: messaggio,
          ok: conferma
        });
      }
      else Backbone.history.navigate("pizzerie", {
        trigger: true
      });
    },

    cartone: function(event) {
      //naviga alla pagina Cartone
      Backbone.history.navigate("cartone", {
        trigger: true
      });     
    },

    riepilogo: function(event) {
      //naviga alla pagina del Riepilgo
      Backbone.history.navigate("riepilogo", {
        trigger: true
      });
    },

    ordine_sospeso: function() {
      //naviga alla pagina dell'Ordine Sospeso
      Backbone.history.navigate("ordine_sospeso", {
        trigger: true
      });
    },

    distruggi_ordine: function() {
      //cancella l'Ordine e torna alla Home
      this.ordine.cancella();
      this.home();
    },

    home: function(event) {
      //naviga alla pagina Home
      Backbone.history.navigate("home", {
        trigger: true
      });
    },

    profilo: function(event) {
      //naviga alla pagina del Profilo
      Backbone.history.navigate("profilo", {
        trigger: true
      });
    }
  });

  return StructureView;

});