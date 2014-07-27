define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils"); 

  var RiepilogoView = Utils.Page.extend({

    constructorName: "RiepilogoView",
    model: MyModel,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.riepilogo;
    },

    id: "riepilogo",

    events: {
    },   

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      //$(this.el).html(this.template(this.model.toJSON()));

      return this;
    }

  });

  return RiepilogoView;

});