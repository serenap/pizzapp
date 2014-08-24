define(function(require) {

  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Cartone = require("collections/Cartone");
  var Utils = require("utils");

  var PopupView = Utils.Page.extend({
    constructorName: "PopupView",
    message: "",
    first_button: false,
    second_button: false,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.popup;
      this.render();
      this.mostra();
    },

    id: "popup",

    events: {
      "touchend #ok" : "ok",
      "touchend #annulla" : "annulla"
    },   

    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];

      return this;
    },

    mostra: function() {
      if($(this.el).is(':hidden')) {
        $(this.el).show("fast");
      }
      else $(this.el).hide("fast");
    }
 
  });

  return PopupView;

});