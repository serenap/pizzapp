define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");
  var PromptView = require("views/PromptView");
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
      "touchend #invia_ordine": "home",
      "touchend #ordine_ricevuto": "distruggi_ordine"
    },

    initialize: function(options) {
      this.collection = new Cartone();
      this.ordine = new Ordine();
      this.collection.svuota();
      this.ordine.cancella();
      // load the precompiled template
      this.template = Utils.templates.structure;
      // bind the back event to the back function
      document.addEventListener("backbutton", this.back, true);
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      //$(this.el).html(this.template(this.model.toJSON()));
      this.contentElement = this.$el.find('#content')[0];
      return this;
    },

    ordina: function() {
      if(Backbone.history.fragment == "profilo") {
        Backbone.history.history.back();
        this.setActiveTabBarElement("nav1");
      }
    },

    back: function() {
      switch(Backbone.history.fragment) {
        case "home":
          navigator.app.exitApp();
          break;
        case "pizzerie":
          this.home();
          break;
        case "menu":
          var cartone = this.collection;
          cartone.carica();
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
          else this.pizzerie();
          break;
        case "cartone":
          Backbone.history.history.back();
          break;
        case "riepilogo":
          var ordine = this.ordine;
          if(ordine.carica()) {
            ordine.cancella();
          }
          Backbone.history.history.back();
          break;
        case "ordine_sospeso":
          document.getElementById("info_ordine_sospeso").style.visibility='visible';
          document.getElementById("normal").style.visibility='hidden';
          Backbone.history.history.back();
          break;
        case "profilo":
          Backbone.history.history.back();
          this.setActiveTabBarElement("nav1");
          break;
      }
    },

    setActiveTabBarElement: function(elementId) {
      // here we assume that at any time at least one tab bar element is active
      document.getElementsByClassName("active")[0].classList.remove("active");
      document.getElementById(elementId).classList.add("active");
    },

    pizzerie: function(event) {
      if(this.collection.length != 0) {
        var messaggio = "Cambiando pizzeria dovrai svuotare il tuo Cartone. Vuoi continuare?";
        var conferma = function() {
          this.collection.svuota();
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
      Backbone.history.navigate("cartone", {
        trigger: true
      });     
    },

    riepilogo: function(event) {
      Backbone.history.navigate("riepilogo", {
        trigger: true
      });
    },

    ordine_sospeso: function() {
      Backbone.history.navigate("ordine_sospeso", {
        trigger: true
      });
    },

    distruggi_ordine: function() {
      this.ordine.cancella();
      this.home();
    },

    home: function(event) {
      Backbone.history.navigate("home", {
        trigger: true
      });
    },

    profilo: function(event) {
      Backbone.history.navigate("profilo", {
        trigger: true
      });
    }
  });

  return StructureView;

});