define(function(require) {

  var Backbone = require("backbone");
  var Pizzeria = require("models/Pizzeria");
  var Utils = require("utils");
  var AlertView = require("views/AlertView");

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

    events: {
      "touchend .pizzeria": "menu"
    },

    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      if(this.model.riposoSettimanale()&&this.model.aperta()){
        $(this.el).find(".chiusa").hide();
        $(this.el).find(".riposo").hide();
      }else if(this.model.riposoSettimanale()&&!this.model.aperta()){
        $(this.el).find(".aperta").hide();
        $(this.el).find(".riposo").hide();}
      else{
        $(this.el).find(".orario").hide();
        $(this.el).find(".chiusa").hide();
        $(this.el).find(".aperta").hide();
      }
      return this;
    },

    menu: function(event) {
      if(this.model.aperta()) {
        window.localStorage.setItem("pizzeria", JSON.stringify(this.model));
        Backbone.history.navigate("menu", {
          trigger: true
        });
      }
      else {
        var messaggio = "Questa pizzeria è chiusa ora.";
        var alert = new AlertView({message: messaggio});
      }
    }
  
  });

  return PizzeriaSubView;

});