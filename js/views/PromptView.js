define(function(require) {

  var Utils = require("utils");

  var PromptView = Utils.Page.extend({
    constructorName: "PromptView",
    
    initialize: function(options) {
      // load the precompiled template
      this.template = Utils.templates.prompt;
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
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).find(".message").html(this.options.message);
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