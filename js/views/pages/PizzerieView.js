define(function(require) {

  var Backbone = require("backbone");
  var ListaPizzerie = require("collections/ListaPizzerie");
  var PizzeriaSubView = require("views/pages/PizzeriaSubView");
  var AlertView = require("views/AlertView");
  var Utente = require("models/Utente");
  var Utils = require("utils");
  var Spinner = require("spin");

  var PizzerieView = Utils.Page.extend({

    constructorName: "PizzerieView",
    collection: ListaPizzerie,
    
    initialize: function() {
      var instance = this;
      //carica il template precompilato
      this.template = Utils.templates.pizzerie;
      //inizializza la lista di Pizzerie ed effettua il fetch
      this.collection = new ListaPizzerie();
      this.collection.fetch();
    },

    id: "pizzerie",

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template({}));

      var instance = this;
      var utente = new Utente();
      utente.carica(utente.get("a_casa"));     
      //trasforma l'indirizzo di consegna in lat e lng, 
      //poi verifica se la pizzeria lo raggiunge
      var geocoder = new google.maps.Geocoder();      
      var indirizzo_consegna = utente.get("via") + " " + utente.get("n_civico") + ", " + utente.get("citta");
    
      geocoder.geocode({"address": indirizzo_consegna}, function (results, status) {
        //inizializza uno spinner per il caricamento
        var opts = {
          lines: 15, //linee da disegnare
          length: 15, //lunghezza delle linee
          width: 5, //spessore delle linee
          radius: 20, //raggio del cerchio interno
          corners: 1, //rotondità degli angoli (0..1)
          shadow: true, //ombra
          hwaccel: true, //accelerazione hardware
        };  
        var target = document.getElementById("spinner_pizzerie");
        var spinner = new Spinner(opts).spin(target);

        var latlng = results[0].geometry.location.toString().split(",");
        var length = latlng[1].length-1;
        var lat = latlng[0].substring(1);
        var lng = latlng[1].substring(0,length);
        $("#lat").val(lat);
        $("#lng").val(lng);
        //se i valori di lat e lng non sono vuoti
        if($("#lat").val() != '' && $("#lng").val() != '') {
          spinner.stop();
          //per ogni model nella Lista, inizializza una PizzeriaSubView e 
          //compila tutte le sottoliste
          var numero_pizzerie = 0;
          instance.collection.each(function(pizzeria) {
            var pizzeriaSV = new PizzeriaSubView({model: pizzeria});
            if(pizzeria.raggiungeIndirizzo($("#lat").val(), $("#lng").val())) {
              numero_pizzerie++;
              if(pizzeria.riposoSettimanale() && pizzeria.aperta())
                $(instance.el).find("ul#lista_pizzerie_aperte").append(pizzeriaSV.el);
              else if(pizzeria.riposoSettimanale() && !pizzeria.aperta())
                $(instance.el).find("ul#lista_pizzerie_chiuse").append(pizzeriaSV.el);
              else $(instance.el).find("ul#lista_pizzerie_riposo").append(pizzeriaSV.el);
            }
          });
        }
        else {
          var messaggio = "C'è stato un problema, riprova";
          var alert = new AlertView({message: messaggio});
          Backbone.history.history.back();
        }
        if(numero_pizzerie == 0) {
          var messaggio = "Spiacente, non ho trovato pizzerie che possano raggiungere il tuo indirizzo.";
          var alert = new AlertView({message: messaggio});
          Backbone.history.history.back();
        }
              
      });
      return this;
     } 
  });

  return PizzerieView;

});