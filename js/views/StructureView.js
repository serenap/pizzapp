define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");

  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",
    id: "main",

    events: {
      "touchend #back": "goBack",
      "touchend #nav1": "myView",
      "touchend #nav2": "profilo",
      "touchend #cartone": "cartone",
      "touchend #goRiepilogo": "goRiepilogo"
    },

    initialize: function(options) {
      var cartone = new Cartone();
      cartone.svuota();
      // load the precompiled template
      this.template = Utils.templates.structure;
      //this.on("inTheDOM", this.rendered);
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
     
      window.history.back();
    },

    setActiveTabBarElement: function(elementId) {
      // here we assume that at any time at least one tab bar element is active
      document.getElementsByClassName("active")[0].classList.remove("active");
      document.getElementById(elementId).classList.add("active");
    },

    pizzerie: function(event) {
      Backbone.history.navigate("pizzerie", {
        trigger: true
      });
    },

    cartone: function(event) {
       Backbone.history.navigate("cartone", {
        trigger: true
      });
        
    },

    goRiepilogo: function(event){
       Backbone.history.navigate("riepilogo", {
        trigger: true
      });
    },

    myView: function(event) {
      Backbone.history.navigate("myview", {
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