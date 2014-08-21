define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var StructureView = require("views/StructureView");
  var MyView = require("views/pages/MyView");
  var PizzerieView = require("views/pages/PizzerieView");
  var ProfiloView = require("views/pages/ProfiloView");
  var MenuView = require("views/pages/MenuView");
  var CartoneView = require("views/pages/CartoneView");
  var RiepilogoView = require("views/pages/RiepilogoView");
  

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "myview": "myView",
      "pizzerie": "pizzerie",
      "profilo": "profilo",
      "menu" : "menu",
      "cartone" : "cartone",
      "riepilogo" : "goRiepilogo"
    },

    firstView: "myview",

    initialize: function(options) {
      this.currentView = undefined;
      
    },

    myView: function() {
     document.getElementById("cartone").style.display="block";
     document.getElementById("goRiepilogo").style.display="none";
     document.getElementById("back").style.display="none";
     document.getElementById("title").innerHTML = "Home";
     this.structureView.setActiveTabBarElement("nav1");
      // create the view
      var page = new MyView();
      // show the view
      this.changePage(page);
    },

    pizzerie: function() {
     document.getElementById("cartone").style.display="block";
     document.getElementById("goRiepilogo").style.display="none";
     document.getElementById("back").style.display="block";
     document.getElementById("title").innerHTML = "Pizzerie";


     // create the view and show it
      var page = new PizzerieView();
        this.changePage(page);
    },

    menu: function() {
     document.getElementById("cartone").style.display="block";
     document.getElementById("goRiepilogo").style.display="none";
     document.getElementById("back").style.display="block";
     document.getElementById("title").innerHTML = "Menu'";
     
     // highlight the nav2 tab bar element as the current one
     // this.structureView.setActiveTabBarElement("nav3");
     // create the view and show it
      var page = new MenuView();
        this.changePage(page);
    },

    cartone: function() {
     document.getElementById("cartone").style.display="none";
     document.getElementById("goRiepilogo").style.display="block";
     document.getElementById("back").style.display="block";
     document.getElementById("title").innerHTML = "Il mio cartone";
      
       var page = new CartoneView();
        this.changePage(page);
      
     
    },

     profilo: function() {
      document.getElementById("cartone").style.display="block";
      document.getElementById("goRiepilogo").style.display="none";
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Profilo";
     // highlight the nav2 tab bar element as the current one
       this.structureView.setActiveTabBarElement("nav2");
     // create the view and show it
      var page = new ProfiloView();
        this.changePage(page);
    },

     goRiepilogo: function() {

      document.getElementById("cartone").style.display="none";
      document.getElementById("goRiepilogo").style.display="none"; 
      document.getElementById("back").style.display="block";
      document.getElementById("title").innerHTML = "Riepilogo";

     // highlight the nav2 tab bar element as the current one
     this.structureView.setActiveTabBarElement("nav1");
     // create the view and show it
     var page = new RiepilogoView();
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