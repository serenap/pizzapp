define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");
  var PromptView = require("views/PromptView");

  var StructureView = Backbone.View.extend({
    constructorName: "StructureView",
    collection: Cartone,
    id: "main",

    events: {
      "touchend #back": "goBack",
      "touchend #nav1": "home",
      "touchend #nav2": "profilo",
      "touchend #cartone": "cartone",
      "touchend #riepilogo": "riepilogo",
      "touchend #invia_ordine": "home",
      "touchend #ordine_ricevuto": "home"
    },

    initialize: function(options) {
      this.collection = new Cartone();
      this.collection.svuota();
      // load the precompiled template
      this.template = Utils.templates.structure;
      // bind the back event to the goBack function
      //document.getElementById("back").addEventListener("back", this.goBack(), false);
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      //$(this.el).html(this.template(this.model.toJSON()));
      this.contentElement = this.$el.find('#content')[0];
      return this;
    },

    // generic go-back function
    goBack: function() {
      this.collection.carica();
      if(Backbone.history.fragment == "menu" && 
          this.collection.length != 0) {
        var messaggio = "Cambiando pizzeria dovrai svuotare il tuo Cartone. Vuoi continuare?";
        /*var conferma = function() {
          this.collection.svuota();
          $("#quantita_cartone").html(this.collection.getNumeroPizze());
          Backbone.history.navigate("pizzerie", {
            trigger: true
          });
        };
        var prompt = new PromptView({
          message: messaggio,
          ok: conferma
        });*/
        if(confirm(messaggio)==true) {
          this.collection.svuota();
          $("#quantita_cartone").html(this.collection.getNumeroPizze());
          Backbone.history.navigate("pizzerie", {
            trigger: true
          });
        }
      }
      //window.history.back();
      else Backbone.history.history.back();
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

    riepilogo: function(event){
       Backbone.history.navigate("riepilogo", {
        trigger: true
      });
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