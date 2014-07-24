define(function(require) {

  var Backbone = require("backbone");
  var Utente = require("models/Utente");
  var Utils = require("utils");

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
      this.model.salva();
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

       spinner.stop();
       document.getElementById("local").disabled = false;
            var nodes = document.getElementById("local").getElementsByTagName('*');
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

        
           document.getElementById('civico').value = civico;  
           if(typeof(via)=='undefined')
             document.getElementById('via').value = "";
           else{document.getElementById('via').value = via;}
             document.getElementById('citta').value = citta;
              
          }
        });
    
      }

    }
    
  }

  
  });

  return ProfiloView;

});