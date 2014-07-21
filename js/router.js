define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var StructureView = require("views/StructureView");
  var MyView = require("views/pages/MyView");
  var MapView = require("views/pages/MapView");
  var PizzerieView = require("views/pages/PizzerieView");
  var ProfiloView = require("views/pages/ProfiloView");
  var MenuView = require("views/pages/MenuView");
  var LocalizzazioneView = require("views/pages/LocalizzazioneView");
  var CartoneView = require("views/pages/CartoneView");
  

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "myview": "myView",
      "map": "map",
      "pizzerie": "pizzerie",
      "profilo": "profilo",
      "menu" : "menu",
      "localizzazione" : "local",
      "cartone" : "riepilogo"
    },

    firstView: "myview",

    initialize: function(options) {
      this.currentView = undefined;
    },

    myView: function() {
      // highlight the nav1 tab bar element as the current one
      document.getElementById("title").innerHTML = "HOME";
      this.structureView.setActiveTabBarElement("nav1");

      // create a model with an arbitrary attribute for testing the template engine
      var model = new MyModel({
        key2: "Cercami",
        key1: "Consegna a casa mia"

      });
      // create the view
      var page = new MyView({
        model: model
      });
      // show the view
      this.changePage(page);
    },

    pizzerie: function() {

     document.getElementById("title").innerHTML = "PIZZERIE";
     // create the view and show it
      var page = new PizzerieView();
        this.changePage(page);
    },

    menu: function() {
      document.getElementById("title").innerHTML = "MENU'";
     
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new MenuView();
        this.changePage(page);
    },

    local: function() {
      document.getElementById("title").innerHTML = "CERCAMI";
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new LocalizzazioneView();
        this.changePage(page);
    },


    riepilogo: function() {
      document.getElementById("title").innerHTML = "Il mio cartone";
      var page = new CartoneView();
        this.changePage(page);
    },

     profilo: function() {
      document.getElementById("title").innerHTML = "PROFILO";
     // highlight the nav2 tab bar element as the current one
       this.structureView.setActiveTabBarElement("nav2");
     // create the view and show it
      var page = new ProfiloView();
        this.changePage(page);
    },

    map: function() {
      // highlight the nav2 tab bar element as the current one
    //  this.structureView.setActiveTabBarElement("nav2");
      // create the view and show it
      var page = new MapView();
      this.changePage(page);
    },

    // load the structure view
    showStructure: function() {
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