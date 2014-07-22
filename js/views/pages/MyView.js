define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");

  var MyView = Utils.Page.extend({

    constructorName: "MyView",

    model: MyModel,
    
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.myview;

      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "myview",
    //className: "i-g page",

    events: {
      
      "touchend #pizzerie": "pizzerie",
      "touchend #localizzazione": "local",
      "touchend #relocal" : "local"

    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    local: function() {
        
        

       navigator.geolocation.getCurrentPosition(function(position) {
       var lat = position.coords.latitude;
       var lng = position.coords.longitude;     
       var latlng = new google.maps.LatLng(lat, lng);
       var addr = codeLatLng(latlng);
    
       }, function() {});


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

          if(typeof(civico)=='undefined')
            document.getElementById('civico').value = "";  
          else{
           document.getElementById('civico').value = civico;  
         } 
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
        Backbone.history.navigate("pizzerie", {
        trigger: true
      });
    }

  });

  return MyView;

});