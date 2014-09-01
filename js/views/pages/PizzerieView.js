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
      //carica il template precompilato
      this.template = Utils.templates.pizzerie;
      //inizializza la lista di Pizzerie ed effettua il fetch
      this.collection = new ListaPizzerie();
      this.collection.fetch({success: function(collection){
          instance.render();
        }
      });
    },

    id: "pizzerie",

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));

      var instance = this;
      //per ogni model nella Lista, inizializza una PizzeriaSubView e 
      //compila tutte le sottoliste
      this.collection.each(function(pizzeria) {
        var pizzeriaSV = new PizzeriaSubView({model: pizzeria});
        
        if(pizzeriaSV.model.riposoSettimanale() && pizzeriaSV.model.aperta())
          $(instance.el).find("ul#lista_pizzerie_aperte").append(pizzeriaSV.el);
        else if(pizzeriaSV.model.riposoSettimanale() && !pizzeriaSV.model.aperta())
          $(instance.el).find("ul#lista_pizzerie_chiuse").append(pizzeriaSV.el);
        else $(instance.el).find("ul#lista_pizzerie_riposo").append(pizzeriaSV.el);
      }, this);
      return this;
    }
    
  });

  return PizzerieView;

});