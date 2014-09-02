define(function(require) {

  var Backbone = require("backbone");
  var Utente = require("models/Utente");
  var Ordine = require("models/Ordine");
  var Utils = require("utils");
  var Spinner = require("spin");
  var Cartone = require("collections/Cartone");
  var AlertView = require("views/AlertView");
  var PromptView = require("views/PromptView");

  var ProfiloView = Utils.Page.extend({

    constructorName: "ProfiloView",
    model: Utente,
    
    initialize: function() {
      //carica il template precompilato
      this.template = Utils.templates.profilo;
      //carica l'Utente
      this.model = new Utente();
      this.model.carica(true);
      this.render();
    },

    id: "profilo",

    events: {
      "touchend #salva" : "salvaUtente",
      "touchend #localizza" : "localizza"
    },   

    render: function() {
      //carica il template
      this.el.innerHTML = this.template({});
      //crea un riferimento all'elemento di contenuto
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    salvaUtente: function() {
      var instance = this;
      var cartone = new Cartone();
      var ordine = new Ordine();
      //recupera i dati dalla form
      var nome = this.$el.find("#nome_profilo").val();
      var cognome = this.$el.find("#cognome_profilo").val();
      var citta = this.$el.find("#citta_profilo").val();
      var via = this.$el.find("#via_profilo").val();
      var n_civico = this.$el.find("#civico_profilo").val();
      var telefono = this.$el.find("#telefono_profilo").val();
      //imposta i dati nel model
      this.model.set({
        "nome": nome,
        "cognome": cognome,
        "citta": citta,
        "via": via,
        "n_civico": n_civico,
        "telefono": telefono,
        "a_casa": true
      });
      //se tutti i dati non sono stringhe vuote naviga alla Home
      if(nome != "" && cognome != "" && citta != "" && via != "" && n_civico != "" && telefono != "") {
        //se il Cartone non è vuoto, chiede di svuotarlo per aggiornare i dati
        if(cartone.length == 0) {
          Backbone.history.navigate("home", {
            trigger: true
          });
        }
        else {
          var messaggio = "Aggiornando i tuoi dati dovrai svuotare il tuo Cartone. Vuoi continuare?";
          var conferma = function() {
            cartone.svuota();
            ordine.cancella();
            instance.model.cancella();
            $("#quantita_cartone").html(cartone.getNumeroPizze());
            Backbone.history.navigate("home", {
              trigger: true
            });
          };
          var alert = new PromptView({
            message: messaggio,
            ok: conferma
          });
          this.render();
        }
        this.model.salva(true);
      }
      else {
        var messaggio = "Non hai compilato uno o più campi. Tutti i dettagli sono necessari.";
        var alert = new AlertView({message: messaggio});
        this.render();
      }
    },

    localizza: function() {
      //inizializza uno spinner per il caricamento
      var opts = {
        lines: 15, //numero di linee
        length: 15, //lunghezza delle linee
        width: 5, //spessore delle linee
        radius: 20, //raggio del cerchio interno
        corners: 1, //rotondità degli angoli (0..1)
        shadow: true, //ombra
        hwaccel: true, //accelerazione hardware
      };
      var target = document.getElementById("spinner_profilo");
      var spinner = new Spinner(opts).spin(target);

      //disabilita il popup di localizzazione
      document.getElementById("localizza").disabled = true;
      var nodes = document.getElementById("localizza").getElementsByTagName('*');
      for(var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
      }

      //recupera la posizione dell'Utente
      navigator.geolocation.getCurrentPosition(onSuccess,Error);

      //callback di successo
      function onSuccess(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;     
        var latlng = new google.maps.LatLng(lat, lng);
        var addr = codeLatLng(latlng);

        //riabilita il popup e ferma lo spinner
        document.getElementById("localizza").disabled = false;
        var nodes = document.getElementById("localizza").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++) {
          nodes[i].disabled = false;
        }
        spinner.stop();
      }
      //callback di errore
      function Error(error) {
        spinner.stop();
        var messaggio = "Non riesco a trovarti. Assicurati di aver attivato il GPS.";
        var alert = new AlertView({message: messaggio});
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
              document.getElementById('civico_profilo').value = civico;  
              if(typeof(via)=='undefined')
                document.getElementById('via_profilo').value = "";
              else document.getElementById('via_profilo').value = via; 
              if(typeof(citta) == 'undefined')
                document.getElementById('citta_profilo').value = "";
              else document.getElementById('citta_profilo').value = citta;     
            }
          });
        }
      } 
    }
  
  });

  return ProfiloView;

});