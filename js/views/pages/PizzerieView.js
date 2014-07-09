define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var PizzerieView = Utils.Page.extend({

    constructorName: "PizzerieView",

    model: MyModel,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.pizzerie;

      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "pizzerie",
    //className: "i-g page",

    events: {
      "touchend #pizz1": "menu",
      "touchend #pizz2": "menu"


    },   


    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
     //$(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    menu: function(event) {
        Backbone.history.navigate("menu", {
        trigger: true
      });
    }
  
  });

  return PizzerieView;

});