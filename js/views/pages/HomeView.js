define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var Spinner = require("spin");
  var Utente = require("models/Utente");
  var Cartone = require("collections/Cartone");
  var Ordine = require("models/Ordine");
  var AlertView = require("views/AlertView");

  var HomeView = Utils.Page.extend({
    constructorName: "HomeView",
    
    initialize: function() {
      var cartone = new Cartone();
      cartone.svuota();

      // load the precompiled template
      this.template = Utils.templates.home;
      this.render();
    },

    id: "home",

    events: {
      "touchend #consegna_a_casa": "pizzerie",
      "touchend #conferma_indirizzo": "aggiorna_indirizzo",
      "touchend #localizzazione": "localizza",
      "touchend #relocal" : "localizza",
      "touchend #dettaglio_ordine_sospeso": "ordine_sospeso"
    },

    render: function() {
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];

      var ordine = new Ordine();
      if(ordine.carica()) {
        document.getElementById("info_ordine_sospeso").style.visibility='visible';
        document.getElementById("normal").style.visibility='hidden';
      }

      return this;
    },

    localizza: function() {
    	function checkNetConnection() {
    		var xhr = new XMLHttpRequest();
    		var file = "http://demos.subinsb.com/cdn/dot.png";
    		var r = Math.round(Math.random() * 10000);
    		xhr.open('HEAD', file + "?subins=" + r, false);
    		try {
    		  xhr.send();
    		  if (xhr.status >= 200 && xhr.status < 304) {
    		    return true;
    		  }
          else return false;
    		}
        catch (e) {
    		  return false;
    		}
    	}

      var ordine = new Ordine();
    	
      if(ordine.carica()) {
        var messaggio = "Hai ancora un ordine in sospeso.";
        var alert = new AlertView({message: messaggio});
      }
      else {
        if(checkNetConnection()) {
          var opts = {
              lines: 15, // The number of lines to draw
              length: 15, // The length of each line
              width: 5, // The line thickness
              radius: 20, // The radius of the inner circle
              corners: 1, // Corner roundness (0..1)
              shadow: true, // Whether to render a shadow
              hwaccel: true, // Whether to use hardware acceleration
          };  
          var target = document.getElementById('spinner');
          var spinner = new Spinner(opts).spin(target);
          
          document.getElementById("local").disabled = true;
              var nodes = document.getElementById("local").getElementsByTagName('*');
              for(var i = 0; i < nodes.length; i++){
                  nodes[i].disabled = true;}

          navigator.geolocation.getCurrentPosition(onSuccess,Error);

          function onSuccess(position){
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;     
            var latlng = new google.maps.LatLng(lat, lng);
            var addr = codeLatLng(latlng);
             
            document.getElementById("local").disabled = false;
            var nodes = document.getElementById("local").getElementsByTagName('*');
            for(var i = 0; i < nodes.length; i++) {
              nodes[i].disabled = false;
            }
            spinner.stop();
          }

          function Error(error) {
            spinner.stop();
            var messaggio = "Non riesco a trovarti. Assicurati di aver attivato il GPS.";
            var alert = new AlertView({message: messaggio});
          }

          function codeLatLng(latlng) {
            var geocoder = new google.maps.Geocoder();
        
            if (geocoder) {
              geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                    for (i = 0; i < results[0].address_components.length; i++) {
                      for (j = 0; j < results[0].address_components[i].types.length; j++) {
                        if (results[0].address_components[i].types[j] == "route")
                          var via = results[0].address_components[i].long_name;
                        if (results[0].address_components[i].types[j] == "street_number")
                          var civico = results[0].address_components[i].long_name;
                        if (results[0].address_components[i].types[j] == "locality")
                          var citta = results[0].address_components[i].long_name;
                       
                        
                      }
                    }
                  }
                  document.getElementById('civico').value = civico;  
                  if(typeof(via) == 'undefined')
                    document.getElementById('via').value = "";
                  else document.getElementById('via').value = via;
                  if(typeof(citta) == 'undefined')
                    document.getElementById('citta').value = "";
                  else document.getElementById('citta').value = citta;      
                }
              });  
            }
          }
        }
        else {
          var messaggio = "Nessuna connessione. Devi essere connesso per procedere.";
          var alert = new AlertView({message: messaggio});
        }
      }
    },

    pizzerie: function(event) {
      var utente = new Utente(true);
      var ordine = new Ordine();

      if(utente.completo()) {
        if(ordine.carica()) {
          var messaggio = "Hai ancora un ordine in sospeso.";
          var alert = new AlertView({message: messaggio});
        }
        else Backbone.history.navigate("pizzerie", {
          trigger: true
        });
      }
      else {
        var messaggio = "Mancano alcuni dei tuoi dati per la consegna. Aggiorna il tuo Profilo.";
        var alert = new AlertView({message: messaggio});
      }
    },

    aggiorna_indirizzo: function() {
      var utente = new Utente(true);
      var nuova_citta = $("#citta").val();
      var nuova_via = $("#via").val();
      var nuovo_civico = $("#civico").val();
      if(nuova_citta != "" && nuova_via != "" && nuovo_civico != "") {
        utente.set({
          citta: nuova_citta,
          via: nuova_via,
          n_civico: nuovo_civico
        });
        utente.salva(true);
        this.pizzerie();
      }
      else {
        var messaggio = "Indirizzo incompleto.";
        var alert = new AlertView({message: messaggio});
      }
    },

    ordine_sospeso: function(event) {
      document.getElementById("ordine_sospeso").style.visibility='hidden';
      document.getElementById("normal").style.visibility='visible';
    }

  });

  return HomeView;

});