define(function(require) {

  var Backbone = require("backbone");
  var Menu = require("collections/Menu");
  var PizzaSubView = require("views/pages/PizzaSubView");
  var Utils = require("utils");

  var MenuView = Utils.Page.extend({

    constructorName: "MenuView",
    collection: Menu,
    
    initialize: function() {
      var instance = this;

      // load the precompiled template
      this.template = Utils.templates.menu;
      this.collection = new Menu();
      this.collection.fetch({success: function(collection){
          instance.render();
        }
      });
    },

    id: "menu",
    //className: "i-g page",

    events: {
      
    },   


    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));

      var instance = this;

      this.collection.each(function(pizza){
        var pizzaSV = new PizzaSubView({model: pizza});
        var categoria = pizzaSV.model.toJSON().categoria;
        
        $(instance.el).find("#tutte").append(pizzaSV.el);
       
        if(categoria == 'Rossa')
          $(pizzaSV.el).clone(true).appendTo("#rosse");
          
        if(categoria == 'Bianca')
          $(pizzaSV.el).clone(true).appendTo("#bianche");
      

       }, this);

      return this;
    }

     
  });

  return MenuView;

});