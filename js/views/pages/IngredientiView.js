define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var IngredientiView = Utils.Page.extend({

    constructorName: "IngredientiView",

    model: MyModel,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.listaIngredienti;

      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "listaIngredienti",
    //className: "i-g page",

    events: {
    

    },   


    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
     //$(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

  
  });

  return IngredientiView;

});