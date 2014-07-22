define(function(require) {

  var Backbone = require("backbone");
  var ListaPizzerie = require("collections/ListaPizzerie");
  var Utils = require("utils");

  var PizzerieView = Utils.Page.extend({

    constructorName: "PizzerieView",
    collection: ListaPizzerie,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.pizzerie;

      var lista = new ListaPizzerie();
      lista.fetch({success: function(collection){
          
        }
      });

      //this.render();

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



    //Forse c'è bisogno di un oggetto PizzeriaView - questo va rinominato in ListaPizzerieView
    /*  this.collection.each(function(pizzeria){
          var pizzeria = new PizzeriaView({model: pizzeria});
          this.$el.append(pizzeria.el);
      }, this);*/
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