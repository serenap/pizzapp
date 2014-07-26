define(function(require) {

  var Backbone = require("backbone");
  var ListaPizzerie = require("collections/ListaPizzerie");
  var PizzeriaSubView = require("views/pages/PizzeriaSubView");
  var Utils = require("utils");

  var PizzerieView = Utils.Page.extend({

    constructorName: "PizzerieView",
    collection: ListaPizzerie,
    
    initialize: function() {
      var instance = this;

      // load the precompiled template
      this.template = Utils.templates.pizzerie;
      this.collection = new ListaPizzerie();
      this.collection.fetch({success: function(collection){
          instance.render();
        }
      });
    },

    id: "pizzerie",
    //className: "i-g page",

    /*events: {
      "touchend #pizz1": "menu",
      "touchend #pizz2": "menu"
    },*/


    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));

      var instance = this;

      this.collection.each(function(pizzeria){
        var pizzeriaSV = new PizzeriaSubView({model: pizzeria});
        $(instance.el).find("ul").append(pizzeriaSV.el);
      }, this);
      return this;
    },

    /*menu: function(event) {
      Backbone.history.navigate("menu", {
        trigger: true
      });
    }*/
  
  });

  return PizzerieView;

});