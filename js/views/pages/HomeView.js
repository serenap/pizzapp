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
      //svuota il Cartone
      var cartone = new Cartone();
      cartone.svuota();
      //carica il template precompilato
      this.template = Utils.templates.home;
      this.render();
    },

    id: "home",

    events: {
      "touchend #consegna_a_casa": "pizzerie",
      "touchend #conferma_indirizzo": "aggiornaIndirizzo",
      "touchend #localizzazione": "localizza",
      "touchend #relocal": "localizza",
      "touchend #chiudi_local": "nascondiCercami",
      "touchend #dettaglio_ordine_sospeso": "ordineSospeso"
    },

    render: function() {
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];

      //se c'è un Ordine in sospeso mostra il reminder
      var ordine = new Ordine();
      if(ordine.carica()) {
        document.getElementById("info_ordine_sospeso").style.visibility='visible';
        document.getElementById("normal").style.visibility='hidden';
      }

      return this;
    },

    mostraCercami: function() {
      //mostra il popup di localizzazione
      if($(this.el).find("#local").is(":hidden"))
        $(this.el).find("#local").show("fast");
    },

    nascondiCercami: function() {
      //nascondi il popup di localizzazione
      if($(this.el).find("#local").is(":visible"))
        $(this.el).find("#local").hide("fast");
    },

    localizza: function() {
      //controlla se il dispositivo è connesso
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

      //se c'è un Ordine in sospeso impedisce la procedura
      var ordine = new Ordine();
      if(ordine.carica()) {
        var messaggio = "Hai ancora un ordine in sospeso.";
        var alert = new AlertView({message: messaggio});
      }
      else {
        if(checkNetConnection()) {
          this.mostraCercami();
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
          var target = document.getElementById('spinner');
          var spinner = new Spinner(opts).spin(target);
          
          setTimeout(function() {
          if($("#local").is(':visible')){
            spinner.stop();
            $("#local").hide('fast');
            if(document.getElementById('via').value == '' && document.getElementById('citta').value == ''){
            var messaggio = "Non riesco a trovarti. Assicurati di aver attivato il GPS.";
            var alert = new AlertView({message: messaggio});
             } 
            }
          },5000);

          //disabilita il popup di localizzazione
          document.getElementById("local").disabled = true;
          var nodes = document.getElementById("local").getElementsByTagName('*');
          for(var i = 0; i < nodes.length; i++) {
              nodes[i].disabled = true;
          }

          //recupera la posizione dell'Utente
          navigator.geolocation.getCurrentPosition(onSuccess,Error);

          //callback di successo
          function onSuccess(position){
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;     
            var latlng = new google.maps.LatLng(lat, lng);
            var addr = codeLatLng(latlng);
            
            //riabilita il popup e ferma lo spinner
            document.getElementById("local").disabled = false;
            var nodes = document.getElementById("local").getElementsByTagName('*');
            for(var i = 0; i < nodes.length; i++) {
              nodes[i].disabled = false;
            }
            spinner.stop();
          }

          //callback di errore
          function Error(error) {
            if($("#local").is(':visible')){
            spinner.stop();
            var messaggio = "Non riesco a trovarti. Assicurati di aver attivato il GPS.";
            var alert = new AlertView({message: messaggio});
            }
          }

          //formatta la posizione trovata
          function codeLatLng(latlng) {
            var geocoder = new google.maps.Geocoder();
            
            //recupera città, via e numero civico
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
                  //scrive i valori trovati nei campi della form
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
      //carica Ordine e Utente
      var ordine = new Ordine();
      var utente = new Utente();
      utente.cancellaNonACasa();
      utente.carica(true);
      //se sono presenti tutti i dati necessari e non c'è un Ordine in sospeso 
      //procedi
      if(utente.completo()) {
        utente.set("a_casa", true);
        utente.salva(true);
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

    aggiornaIndirizzo: function() {
      //carica l'Ordine e l'Utente a casa per recuperare i dati anagrafici
      var ordine = new Ordine();
      var utente = new Utente();
      utente.carica(true);
      //recupera i valori immessi dal popup
      var nuova_citta = $("#citta").val();
      var nuova_via = $("#via").val();
      var nuovo_civico = $("#civico").val();
      //se non sono stringhe vuote, salva l'Utente e vai alle Pizzerie
      if(nuova_citta != "" && nuova_via != "" && nuovo_civico != "") {
        utente.set({
          citta: nuova_citta,
          via: nuova_via,
          n_civico: nuovo_civico
        });
        if(utente.completo()) {
          utente.set("a_casa", false);
          utente.salva(false);
          if(ordine.carica()) {
            var messaggio = "Hai ancora un ordine in sospeso.";
            var alert = new AlertView({message: messaggio});
          }
          else {
            this.nascondiCercami();
            Backbone.history.navigate("pizzerie", {
              trigger: true
            });
          }
        }
        else {
          var messaggio = "Mancano alcuni dei tuoi dati per la consegna. Aggiorna il tuo Profilo.";
          var alert = new AlertView({message: messaggio});
        }
      }
      else {
        var messaggio = "Indirizzo incompleto.";
        var alert = new AlertView({message: messaggio});
      }
    },

    ordineSospeso: function(event) {
      //mostra l'Ordine Sospeso
      document.getElementById("ordine_sospeso").style.visibility='hidden';
      document.getElementById("normal").style.visibility='visible';
    }

  });

  return HomeView;

});