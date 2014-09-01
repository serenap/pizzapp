define(function(require) {
  
  var Utils = require("utils");

  var AlertView = Utils.Page.extend({
    constructorName: "AlertView",
    
    initialize: function(options) {
      //carica il template precompilato
      this.template = Utils.templates.alert;
      //imposta i parametri passati alla creazione
      this.options = options;
      this.render();
      this.mostra();
    },

    id: "alert",

    events: {
      "touchend #ok_alert" : "ok"
    },   

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      //imposta il messaggio dell'alert dialog
      $(this.el).find(".message").html(this.options.message);
      //innesta l'alert sulla pagina
      $("body").prepend(this.el);

      return this;
    },

    mostra: function() {
      $(this.el).show("fast");
    },

    chiudi: function() {
      $(this.el).hide("fast");
    },

    ok: function() {
      this.chiudi();
      this.remove();
    }
 
  });

  return AlertView;

});