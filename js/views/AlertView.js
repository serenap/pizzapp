define(function(require) {
  
  var Utils = require("utils");

  var AlertView = Utils.Page.extend({
    constructorName: "AlertView",
    
    initialize: function(options) {
      // load the precompiled template
      this.template = Utils.templates.alert;
      this.options = options;
      this.render();
      this.mostra();
    },

    id: "alert",

    events: {
      "touchend #ok" : "ok"
    },   

    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).find(".message").html(this.options.message);

      return this;
    },

    mostra: function() {
      if($(this.el).is(':hidden')) {
        $(this.el).show("fast");
      }
      else $(this.el).hide("fast");
    },

    ok: function() {
      this.mostra();
      this.remove();
    }
 
  });

  return AlertView;

});