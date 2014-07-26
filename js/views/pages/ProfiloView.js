define(function(require) {

  var Backbone = require("backbone");
  var Utente = require("models/Utente");
  var Utils = require("utils");
  var Spinner = require("spin");

  var ProfiloView = Utils.Page.extend({

    constructorName: "ProfiloView",
    model: Utente,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.profilo;
      this.model = new Utente();
      this.render();
    },

    id: "profilo",
    //className: "i-g page",

    events: {
      "touchend #salva" : "salvaUtente",
      "touchend #localizza" : "localizza"
    },   

    render: function() {
      this.model.carica();
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      $(this.el).html(this.template(this.model.toJSON()));
      console.log(JSON.stringify(this.model));
      return this;
    },

    salvaUtente: function(){
      this.model.set({
        "nome": this.$el.find("#nome_profilo").val(),
        "cognome": this.$el.find("#cognome_profilo").val(),
        "citta": this.$el.find("#citta_profilo").val(),
        "via": this.$el.find("#via_profilo").val(),
        "n_civico": this.$el.find("#civico_profilo").val(),
        "telefono": this.$el.find("#telefono_profilo").val()
      });
      this.model.salva();
      this.render();
    },

    localizza: function() {
        var opts = {
            lines: 15, // The number of lines to draw
            length: 25, // The length of each line
            width: 20, // The line thickness
            radius: 30, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            shadow: true, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceleration
        };  
        var target = document.getElementById("spinner_profilo");
        var spinner = new Spinner(opts).spin(target);
        document.getElementById("localizza").disabled = true;
        var nodes = document.getElementById("localizza").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
                nodes[i].disabled = true;
        }

        navigator.geolocation.getCurrentPosition(onSuccess,Error);

    function onSuccess(position){
    
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;     
    var latlng = new google.maps.LatLng(lat, lng);
    var addr = codeLatLng(latlng);

    spinner.stop();
    document.getElementById("localizza").disabled = false;
    var nodes = document.getElementById("localizza").getElementsByTagName('*');
    for(var i = 0; i < nodes.length; i++){
      nodes[i].disabled = false;}
    }

    function Error(error){
      spinner.stop();
    }

    

    function codeLatLng(latlng) {

      var geocoder = new google.maps.Geocoder();
    
      if (geocoder) {
        geocoder.geocode({'latLng': latlng}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {


        if (results[0]) {
          for (i = 0; i < results[0].address_components.length; i++){
            for (j = 0; j < results[0].address_components[i].types.length; j++) {

              if (results[0].address_components[i].types[j] == "route")
               var via = results[0].address_components[i].long_name;

              
              if (results[0].address_components[i].types[j] == "street_number")
               var civico = results[0].address_components[i].long_name;

             
              if (results[0].address_components[i].types[j] == "administrative_area_level_2")
                var citta = results[0].address_components[i].long_name;
            }
          }
        }
        
        document.getElementById('civico_profilo').value = civico;  
          if(typeof(via)=='undefined')
        document.getElementById('via_profilo').value = "";
          else{document.getElementById('via_profilo').value = via;}
        document.getElementById('citta_profilo').value = citta;   
        }
        });
    
      }

    }
    
  }

  
  });

  return ProfiloView;

});