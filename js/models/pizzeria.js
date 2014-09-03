define(function(require) {

	var Backbone = require("backbone");
	var Menu = require("collections/Menu");

	var Pizzeria = Backbone.Model.extend({
		constructorName: "Pizzeria",
		defaults: {
			nome: '',
			indirizzo:'',
			lat:'',
			lng:'',
			telefono: '',
			immagine: null,
			menu: null,
			maxDistanza: 0,
			giorniChiusura: [],
			orarioApertura: []
		},

		//ad ogni indice corrisponde una stringa per il giorno settimanale
		mappaGiorni: [
			"Domenica",
			"Lunedì",
			"Martedì",
			"Mercoledì",
			"Giovedì",
			"Venerdì",
			"Sabato"
		],

		//salva la Pizzeria scelta nel browser
		salva: function() {
			window.localStorage.setItem("pizzeria", JSON.stringify(this));
		},

		//carica la Pizzeria scelta dal browser
		carica: function() {
			this.set(JSON.parse(window.localStorage.getItem("pizzeria")));
		},

		//verifica se la pizzeria è aperta nel momento dell'invocazione
		aperta: function(){
			var data = new Date();
			return this.get("giorniChiusura").indexOf(this.mappaGiorni[data.getDay()]) == -1 && 
					data.getHours() >= this.get("orarioApertura")[0] && 
					data.getHours() <= this.get("orarioApertura")[1];
		},

		//restiuisce il numero corrispondente al giorno di chiusura
		riposoSettimanale: function(){
			var data = new Date();
			return this.get("giorniChiusura").indexOf(this.mappaGiorni[data.getDay()]) == -1;
		},

		raggiungeIndirizzo: function(lat_utente,lng_utente){
				var lat1 = lat_utente;
				var lng1 = lng_utente;
				var lat2 = this.get('lat');
				var lng2 = this.get('lng');

				var maxDist = this.get('maxDistanza');

				var distanza = (3958*3.1415926*Math.sqrt((lat2-lat1)*(lat2-lat1) + Math.cos(lat2/57.29578)*Math.cos(lat1/57.29578)*(lng2-lng1)*(lng2-lng1))/180);

				if (distanza<=maxDist){
					return true;
				}else{
					return distanza;
					
				}
		}
	});

	return Pizzeria;

});