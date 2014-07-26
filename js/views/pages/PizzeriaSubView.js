define(function(require) {

  var Backbone = require("backbone");
  var Pizzeria = require("models/Pizzeria");
  var Utils = require("utils");

  var PizzeriaSubView = Utils.Page.extend({

    constructorName: "PizzeriaSubView",
    model: Pizzeria,
    
    initialize: function() {
      var instance = this;

      // load the precompiled template
      this.template = Utils.templates.pizzeria_sub;
      this.render();
    },

    id: "pizzerie",
    //className: "i-g page",

    events: {
<<<<<<< HEAD

      "touchend .pizzeria": "menu"

=======
      "touchend .pizzeria": "menu"
>>>>>>> origin/master
    },


    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    menu: function(event) {
      window.localStorage.setItem("pizzeria", this.model.get("nome"));
      Backbone.history.navigate("menu", {
        trigger: true
      });
    }
  
  });

  return PizzeriaSubView;

});