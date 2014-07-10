define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var MyView = Utils.Page.extend({

    constructorName: "MyView",

    model: MyModel,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.myview;

      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "myview",
    className: "i-g page",

    events: {
      "touchend #localizzazione": "localizza",
      "touchend #pizzerie": "pizzerie"

    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    localizza: function(event) {
        Backbone.history.navigate("localizzazione", {
        trigger: true
      });

    },

    pizzerie: function(event) {
        Backbone.history.navigate("pizzerie", {
        trigger: true
      });
    }

  });

  return MyView;

});