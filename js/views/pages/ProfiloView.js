define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var ProfiloView = Utils.Page.extend({

    constructorName: "ProfiloView",

    model: MyModel,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.profilo;

      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "profilo",
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

  return ProfiloView;

});