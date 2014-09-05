define(function(require) {

  var Backbone = require("backbone");
  var Pizzeria = require("models/Pizzeria");
  var Utils = require("utils");
  var AlertView = require("views/AlertView");

  var PizzeriaSubView = Backbone.View.extend({

    constructorName: "PizzeriaSubView",
    model: Pizzeria,
    
    initialize: function() {
      //carica il template precompilato
      this.template = Utils.templates.pizzeria_sub;
      this.render();
    },

    id: "pizzerie",

    events: {
      "touchend .pizzeria": "menu"
    },

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      //verifica l'orario d'apertura e il giorno di chiusura della Pizzeria
      if(this.model.riposoSettimanale()&&this.model.aperta()) {
        $(this.el).find(".chiusa").hide();
        $(this.el).find(".riposo").hide();
      }
      else if(this.model.riposoSettimanale()&&!this.model.aperta()) {
        $(this.el).find(".aperta").hide();
        $(this.el).find(".riposo").hide();
      }
      else {
        $(this.el).find(".orario").hide();
        $(this.el).find(".chiusa").hide();
        $(this.el).find(".aperta").hide();
      }
      return this;
    },

    menu: function(event) {
      //se la Pizzeria è aperta, la salva nel browser e naviga alla pagina Menu
      if(this.model.aperta()) {
        this.model.salva();
        Backbone.history.navigate("menu", {
          trigger: true
        });
      }
      else if(!this.model.riposoSettimanale()) { 
          var messaggio = "Questa pizzeria è chiusa in questi giorni: "+ this.model.get('giorniChiusura');
          var alert = new AlertView({message: messaggio});
        }
        else {
          var messaggio = "Questa pizzeria è chiusa ora. Aprirà alle ore "+ this.model.get('orarioApertura')[0]+":00.";
          var alert = new AlertView({message: messaggio});
        }
    }
  
  });

  return PizzeriaSubView;

});