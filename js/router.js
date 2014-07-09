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
  

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "myview": "myView",
      "map": "map",
      "home": "home",
      "profilo": "profilo",
      "localizzazione": "localizzazione",
      "listaPizzerie": "listaPizzerie",
      "listaIngredienti": "listaIngredienti",
      "menu" : "menu",
      "cartone": "cartone",
      "riepilogo": "riepilogo"
    },

    firstView: "myview",

    initialize: function(options) {
      this.currentView = undefined;
    },

    myView: function() {
      // highlight the nav1 tab bar element as the current one
      this.structureView.setActiveTabBarElement("nav1");
      // create a model with an arbitrary attribute for testing the template engine
      var model = new MyModel({
        key1: "Cercami",
        key2: "Consegna a casa mia"

      });
      // create the view
      var page = new MyView({
        model: model
      });
      // show the view
      this.changePage(page);
    },

    listaPizzerie: function() {
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new PizzerieView();
        this.changePage(page);
    },

    listaIngredienti: function() {
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new IngredientiView();
        this.changePage(page);
    },

    home: function() {
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new HomeView();
        this.changePage(page);
    },

    menu: function() {
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new MenuView();
        this.changePage(page);
    },

    cartone: function() {
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new CartoneView();
        this.changePage(page);
    },

    localizzazione: function() {
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new LocalizzazioneView();
        this.changePage(page);
    },

    profilo: function() {
     // highlight the nav2 tab bar element as the current one
       this.structureView.setActiveTabBarElement("nav2");
     // create the view and show it
      var page = new ProfiloView();
        this.changePage(page);
    },

    riepilogo: function() {
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new RiepilogoView();
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