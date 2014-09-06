define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Cartone = require("collections/Cartone");
  var StructureView = require("views/StructureView");
  var HomeView = require("views/pages/HomeView");
  var PizzerieView = require("views/pages/PizzerieView");
  var ProfiloView = require("views/pages/ProfiloView");
  var MenuView = require("views/pages/MenuView");
  var CartoneView = require("views/pages/CartoneView");
  var RiepilogoView = require("views/pages/RiepilogoView");
  var AlertView = require("views/AlertView");
  var OrdineSospesoView = require("views/pages/OrdineSospesoView");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      "": "structure",
      "home": "home",
      "pizzerie": "pizzerie",
      "profilo": "profilo",
      "menu" : "menu",
      "cartone" : "cartone",
      "riepilogo" : "riepilogo",
      "ordine_sospeso": "ordine_sospeso"
    },

    firstView: "home",

    initialize: function(options) {
      this.currentView = undefined;
    },

    home: function() {
      document.getElementById("cartone").style.display="block";
      document.getElementById("riepilogo").style.display="none";
      document.getElementById("back").style.display="none";
      document.getElementById("title").innerHTML = "Home";
      document.getElementById("subtitle").innerHTML = "";
      this.structureView.setActiveTabBarElement("nav1");
      //crea e mostra la view
      var page = new HomeView();
      this.changePage(page);
    },

    pizzerie: function() {
      if(navigator.onLine) {
        document.getElementById("cartone").style.display="block";
        document.getElementById("riepilogo").style.display="none";
        document.getElementById("back").style.display="block";
        document.getElementById("title").innerHTML = "Pizzerie";
        document.getElementById("subtitle").innerHTML = "";
        //crea e mostra la view
        var page = new PizzerieView();
        this.changePage(page);
      }
      else {
        var messaggio = "Nessuna connessione. Devi essere connesso per procedere.";
        var alert = new AlertView({message: messaggio});
      }
    },

    menu: function() {
      if(navigator.onLine) {
        document.getElementById("cartone").style.display="block";
        document.getElementById("riepilogo").style.display="none";
        document.getElementById("back").style.display="block";
        document.getElementById("title").innerHTML = "Menu";
        //crea e mostra la view
        var page = new MenuView();
        this.changePage(page);
      }
      else {
        var messaggio = "Nessuna connessione. Devi essere connesso per procedere.";
        var alert = new AlertView({message: messaggio});
      }
    },

    cartone: function() {
      var cartone = new Cartone();
      if(cartone.length != 0)
        document.getElementById("riepilogo").style.display="block";
      document.getElementById("cartone").style.display="none";
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Il mio cartone";
      document.getElementById("subtitle").innerHTML = "";
      //crea e mostra la view
      var page = new CartoneView();
      this.changePage(page);
    },

    profilo: function() {
      document.getElementById("cartone").style.display="none";
      document.getElementById("riepilogo").style.display="none";
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Profilo";
      document.getElementById("subtitle").innerHTML = "";
      //imposta nav2 come la tab attiva
      this.structureView.setActiveTabBarElement("nav2");
      //crea e mostra la view
      var page = new ProfiloView();
      this.changePage(page);
    },

    riepilogo: function() {
      document.getElementById("cartone").style.display="none";
      document.getElementById("riepilogo").style.display="none"; 
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Riepilogo";
      document.getElementById("subtitle").innerHTML = "";
      //imposta nav1 come la tab attiva
      this.structureView.setActiveTabBarElement("nav1");
      //crea e mostra la view
      var page = new RiepilogoView();
      this.changePage(page);
    },

    ordine_sospeso: function() {
      document.getElementById("cartone").style.display="none";
      document.getElementById("riepilogo").style.display="none"; 
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Il mio ordine";
      document.getElementById("subtitle").innerHTML = "";
      //imposta nav1 come la tab attiva
      this.structureView.setActiveTabBarElement("nav1");
      //imposta nav2 come la tab attiva
      var page = new OrdineSospesoView();
      this.changePage(page);
    },
 
    structure: function() {    
      if (!this.structureView) {   
        this.structureView = new StructureView();
        //inserisce el della StructureView nel DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      //naviga alla prima view
      this.navigate(this.firstView, {trigger: true});
    },

  });

  return AppRouter;

});