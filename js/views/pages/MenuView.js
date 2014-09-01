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
      //recupera la pizzeria salvata nel browser
      var pizzeria = new Pizzeria();
      pizzeria.carica();
      //l'url per il fetch viene ottenuto dal nome della Pizzeria 
      //(soluzione temporanea all'assenza di server-side)
      var url = "js/JSON/" + pizzeria.get("nome") + ".JSON";

      //carica il template precompilato
      this.template = Utils.templates.menu;
      //inizializza il Menu ed effettua il fetch
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
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));

      var instance = this;
      var cartone = new Cartone();
      //aggiorna il numero di pizze sull'icona del Cartone
      $("#quantita_cartone").html(cartone.getNumeroPizze());

      //recupera la Pizzeria dal browser e imposta il suo nome nel sottotitolo
      //della pagina Menu
      var pizzeria = new Pizzeria();
      pizzeria.carica();
      document.getElementById("subtitle").innerHTML = 'pizzeria '+ pizzeria.get("nome");
      //inizializza tante PizzaSubView quanti model ci sono nel Menu
      this.collection.each(function(pizza) {
        var pizzaSV = new PizzaSubView({model: pizza});
        var pizzaSVall = new PizzaSubView({model: pizza});
        var categoria = pizzaSV.model.toJSON().categoria;
        //riempie le sottoliste del Menu in base alla categoria
        $(instance.el).find("#tutte").append(pizzaSVall.el);  
        if(categoria == 'Rossa') {
          $(instance.el).find("#rosse").append(pizzaSV.el);
        }         
        if(categoria == 'Bianca') {
          $(instance.el).find("#bianche").append(pizzaSV.el);
        }
      }, this);

      return this;
    },

    filter: function(event){
        instance = this;
        $("#no_result").hide("fast");
        //recupera il valore digitato dall'Utente e la categoria di Pizze
        //che vuole filtrare
        var key = $("#pizza_filter").val();
        var categoria_corrente = $(".active")[2].id;
        var l = document.getElementsByTagName("h4").length;
        $("#kk").html(key);

        for(i=0; i<l; i++) {
          //verifica se il valore è contenuto in uno o più degli ingredienti 
          //delle pizze della categoria scelta
          var ingredienti = document.getElementsByClassName("anteprima")[i].childNodes[0].nodeValue;
          var tag = document.getElementsByTagName("h4")[i].childNodes[0].nodeValue;

          if(ingredienti.indexOf(key) > -1)
            this.$(".table-view-cell[name*="+tag+"]").show("fast"); 
          else {              
              this.$(".table-view-cell[name*="+tag+"]").hide("fast");

              if(this.$(".active .table-view-cell").length == this.$(".active .table-view-cell:hidden").length)                 
                $("#no_result").show("fast");
              else $("#no_result").hide("fast"); 
          }
        }
    }
   
  });

  return MenuView;

});