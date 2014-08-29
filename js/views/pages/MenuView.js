define(function(require) {

  var Backbone = require("backbone");
  var Pizzeria = require("models/Pizzeria");
  var Menu = require("collections/Menu");
  var Cartone = require("collections/Cartone");
  var PizzaSubView = require("views/pages/PizzaSubView");
  var Utils = require("utils");

  var MenuView = Utils.Page.extend({

    constructorName: "MenuView",
    collection: Menu,
    
    initialize: function() {
      var instance = this;
      var pizzeria = new Pizzeria(JSON.parse(window.localStorage.getItem("pizzeria")));
      var url = "js/JSON/" + pizzeria.get("nome") + ".JSON";

      // load the precompiled template
      this.template = Utils.templates.menu;
      this.collection = new Menu(url);
      this.collection.fetch({success: function(collection) {
          instance.render();
        }
      });
    },

    id: "menu", 

    events: {

      "input #pizza_filter": "filter"
    },

    render: function() {
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));
      $("#no_result").hide("fast");
      var instance = this;
      var cartone = new Cartone();

      $("#quantita_cartone").html(cartone.getNumeroPizze());
      var pizzeria = new Pizzeria(JSON.parse(window.localStorage.getItem("pizzeria")));
      document.getElementById("subtitle").innerHTML = 'pizzeria '+ pizzeria.get("nome");
      this.collection.each(function(pizza) {
        var pizzaSV = new PizzaSubView({model: pizza});
        var pizzaSVall = new PizzaSubView({model: pizza});
        var categoria = pizzaSV.model.toJSON().categoria;

        $(instance.el).find("#tutte").append(pizzaSVall.el);
          
        if(categoria == 'Rossa'){
          $(instance.el).find("#rosse").append(pizzaSV.el);
        }         
        if(categoria == 'Bianca'){
          $(instance.el).find("#bianche").append(pizzaSV.el);
        }
      }, this);

      return this;
    },

    filter: function(event){
        instance = this;
        $("#no_result").hide("fast");
        
        var key = $("#pizza_filter").val();
      
            var categoria_corrente = $(".active")[2].id;
            var l = document.getElementsByTagName("h4").length;
            $("#kk").html(key);
            for(i=0; i<l; i++){
            var ingredienti = document.getElementsByClassName("anteprima")[i].childNodes[0].nodeValue;
            var tag = document.getElementsByTagName("h4")[i].childNodes[0].nodeValue;
              if(ingredienti.indexOf(key) > -1){
                this.$(".table-view-cell[name*="+tag+"]").show("fast");
                
            }else{              
                this.$(".table-view-cell[name*="+tag+"]").hide("fast");

                if(this.$(".active .table-view-cell").length==this.$(".active .table-view-cell:hidden").length){                  
                    $("#no_result").show("fast");
                   }else{
                    $("#no_result").hide("fast");
                    }
                }
              }

          }
   
  });

  return MenuView;

});