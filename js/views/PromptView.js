define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var PromptView = Backbone.View.extend({
    constructorName: "PromptView",
    
    initialize: function(options) {
      //carica il template precompilato
      this.template = Utils.templates.prompt;
      //imposta i parametri passati alla creazione
      this.options = options;
      this.render();
      this.mostra();
    },

    id: "prompt",

    events: {
      "touchend #ok_prompt" : "ok",
      "touchend #annulla_prompt" : "annulla"
    },   

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      //imposta il messaggio del prompt dialog
      $(this.el).find(".message").html(this.options.message);
      //innesta il prompt sulla pagina
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
      //imposta la funzione da eseguire alla conferma
      this.options.ok();
      this.chiudi();
    },

    annulla: function() {
      this.chiudi();
      this.remove();
    }
 
  });

  return PromptView;

});