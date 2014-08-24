define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var Spinner = require("spin");
  var PopupView = require("views/PopupView");

  var HomeView = Utils.Page.extend({
    constructorName: "HomeView",
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.home;

      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "home",

    events: {
      "touchend #pizzerie": "pizzerie",
      "touchend #localizzazione": "localizza",
      "touchend #relocal" : "localizza"
    },

    render: function() {
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      return this;
    },

    localizza: function() {
        var opts = {
            lines: 15, // The number of lines to draw
            length: 20, // The length of each line
            width: 10, // The line thickness
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

       
       document.getElementById("local").disabled = false;
            var nodes = document.getElementById("local").getElementsByTagName('*');
            for(var i = 0; i < nodes.length; i++){
                nodes[i].disabled = false;}
       spinner.stop();
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

               
                if (results[0].address_components[i].types[j] == "locality")
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
    
  },

    pizzerie: function(event) {
      //if(navigator.connection.type != Connection.NONE)
        Backbone.history.navigate("pizzerie", {
          trigger: true
        });
      /*else {
        var testo = "Nessuna connessione disponibile. Devi essere connesso alla rete per usare pizzApp.";
        var popup = new PopupView({
          message: testo,
          second_button: true,
          ok: function() {
            this.mostra();
            this.remove();
          }
        });
      }*/
    }

  });

  return HomeView;

});