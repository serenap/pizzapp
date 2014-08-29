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
      // the default is the structure view
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
      // create the view
      var page = new HomeView();
      // show the view
      this.changePage(page);
    },

    pizzerie: function() {
      //if(navigator.connection.type != Connection.NONE) {
      if(1) {
        document.getElementById("cartone").style.display="block";
        document.getElementById("riepilogo").style.display="none";
        document.getElementById("back").style.display="block";
        document.getElementById("title").innerHTML = "Pizzerie";
        document.getElementById("subtitle").innerHTML = "";

        // create the view and show it
        var page = new PizzerieView();
        this.changePage(page);
      }
      else {
        var messaggio = "Nessuna connessione. Devi essere connesso per procedere.";
        var alert = new AlertView({message: messaggio});
      }
    },

    menu: function() {
      //if(navigator.connection.type != Connection.NONE) {
      if(1) {
        document.getElementById("cartone").style.display="block";
        document.getElementById("riepilogo").style.display="none";
        document.getElementById("back").style.display="block";
        document.getElementById("title").innerHTML = "Menu";

        // create the view and show it
        var page = new MenuView();
        this.changePage(page);
      }
      else {
        var messaggio = "Nessuna connessione. Devi essere connesso per procedere.";
        var alert = new AlertView({message: messaggio});
        console.log(alert.options);
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
      
      var page = new CartoneView();
      this.changePage(page);
    },

    profilo: function() {
      document.getElementById("cartone").style.display="block";
      document.getElementById("riepilogo").style.display="none";
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Profilo";
      document.getElementById("subtitle").innerHTML = "";

      // highlight the nav2 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav2");
      // create the view and show it
      var page = new ProfiloView();
      this.changePage(page);
    },

    riepilogo: function() {
      document.getElementById("cartone").style.display="none";
      document.getElementById("riepilogo").style.display="none"; 
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Riepilogo";
      document.getElementById("subtitle").innerHTML = "";

      // highlight the nav2 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav1");
      // create the view and show it
      var page = new RiepilogoView();
      this.changePage(page);
    },

    ordine_sospeso: function() {
      document.getElementById("cartone").style.display="none";
      document.getElementById("riepilogo").style.display="none"; 
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Il mio ordine";
      document.getElementById("subtitle").innerHTML = "";
      // highlight the nav2 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav1");
      // create the view and show it
      var page = new OrdineSospesoView();
      this.changePage(page);
    },
 
    // load the structure view
    structure: function() {    
      if (!this.structureView) {   
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate(this.firstView, {trigger: true});
    },

  });

  return AppRouter;

});