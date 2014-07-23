define(function(require) {

  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Utils = require("utils");

  var PizzaSubView = Utils.Page.extend({

    constructorName: "PizzaSubView",
    model: Pizza,
    
    initialize: function() {
      var instance = this;

      // load the precompiled template
      this.template = Utils.templates.pizza_sub;
      this.render();
    },

    //id: "pizzerie",
    //className: "i-g page",

    events: {
      "touchend #mostra": "mostra"
    },   


    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

      mostra: function(){

      if(!($("#dettaglio").is(':hidden'))){    
         
           this.$("#dettaglio").hide();
           this.$("#anteprima").show();

           }
      
      else
      {
        this.$("#dettaglio").show();
        this.$("#anteprima").hide();
        }
  },

    menu: function(event) {
        Backbone.history.navigate("menu", {
        trigger: true
      });
    }
  
  });

  return PizzaSubView;

});