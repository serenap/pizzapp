define(function(require) {

  
  var Backbone = require("backbone");
  var Pizza = require("models/Pizza");
  var Utils = require("utils");
 

  var IngredientiSubView = Utils.Page.extend({
    constructorName: "IngredientiSubView",
    model: Pizza,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.ingredienti_sub;
      this.render();
      this.mostra();
    },

    id: "personalizza",

    events: {
      "touchend #modifica_ingredienti" : "modifica",
      "touchend #chiudi_popup" : "mostra"
    },   

    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    mostra: function() {
      if($(this.el).is(':hidden')) {
        $(this.el).show("fast");
      }
      else $(this.el).hide("fast");
    },

    modifica: function() {
      var ingredienti_aggiornati = [];
      $(".selezionato:checked").each(function(){
        ingredienti_aggiornati.push($(this).val());
      });
      //this.model.set("ingredienti", ingredienti_aggiornati);
      this.mostra();
      this.remove();
    },

    menu: function(event) {
      Backbone.history.navigate("menu", {
        trigger: true
      });
    }
 
  });

  return IngredientiSubView;

});