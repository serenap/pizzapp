define(function(require) {

  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var Spinner = require("spin");

  var LocalizzazioneView = Utils.Page.extend({

    constructorName: "LocalizzazioneView",

    model: MyModel,
    
    initialize: function() {
      // load the precompiled template
      
      this.template = Utils.templates.localizzazione;
      
      this.local();
      

      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "localizzazione",
    //className: "i-g page",

    events: {

    "touchend #local": "local"

    },   


    render: function() {
      
       // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];

      //$(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

  
    

      local: function() {
        
         

       navigator.geolocation.getCurrentPosition(function(position) {
       var lat = position.coords.latitude;
       var lng = position.coords.longitude;
       
       //var latlng = new google.maps.LatLng(lat, lng);
       
       var latlng = new google.maps.LatLng(lat, lng);
       var addr = codeLatLng(latlng);
    
    //alert(addr);

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

    return true;
  }
  
  });

  return LocalizzazioneView;

});