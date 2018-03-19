//MAP SETUP
var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//CALLING DATA
var startingData;
//var majorArterials;
var highIndex;
var highArterials;
var highCollectors;
var lowArterials;

var promise = "https://raw.githubusercontent.com/sydng/OST4GIS-Midterm/master/litter_index_lines.geojson";

//FUNCTIONS FOR FILTERING DATA

var highscoreFilter = function(feature) {
  if(feature.properties.hundred_block_score > 3 && feature.properties.street_class == 2) {
          return feature;
      }
};

var highscoreCollector = function(feature) {
  if(feature.properties.hundred_block_score > 3 && feature.properties.street_class == 4) {
          return feature;
      }
};

var hIndex = function(feature) {
  if(feature.properties.hundred_block_score > 3) {
          return feature;
      }
};

var stInterest = function(feature) {
  if(feature.properties.street_class == 3) {
    return feature;
  }
};

//var arterials = function(feature) {
  //if(feature.properties.street_class == 2) {
    //return feature;
  //}
//};


//FUNCTIONS FOR CHANGING SLIDES
var showSlide1 = function() {
  $('#intro').hide();
  $('#slide-1').show();
};

var showSlide2 = function() {
  $('#slide-1').hide();
  $('#slide-2').show();
};

var showSlide3 = function() {
  $('#slide-2').hide();
  $('#slide-3').show();
};

var showSlide4 = function() {
  $('#slide-3').hide();
  $('#slide-4').show();
};

var showSlide5 = function() {
  $('#slide-4').hide();
  $('#slide-5').show();
};

//FUNCTIONS TO HIDE SLIDES
var hideSlide5 = function() {
  $('#slide-5').hide();
  $('#slide-4').show();
};

var hideSlide4 = function() {
  $('#slide-4').hide();
  $('#slide-3').show();
};

var hideSlide3 = function() {
  $('#slide-3').hide();
  $('#slide-2').show();
};

var hideSlide2 = function() {
  $('#slide-2').hide();
  $('#slide-1').show();
};

var hideSlide1 = function() {
  $('#slide-1').hide();
  $('#intro').show();
};


$(document).ready(function() {
    $.ajax(promise).done(function(data) {
      var parsedData = JSON.parse(data);


      startingData = L.geoJson(parsedData, {
        color: "lightgray",
        filter: stInterest
      }).bindPopup(function(layer) {
          return layer.feature.properties.hundred_block_score.toString();
        }).addTo(map);

      $("#Next-1").click(function() {
        highIndex = L.geoJson(parsedData, {
          color: "red",
          filter: hIndex
        }).addTo(map);
        startingData.clearLayers();  //remove previous layers
        showSlide1();
      });

      $("#Next-2").click(function() {
        highArterials= L.geoJson(parsedData, {
          color: "magenta",
          filter: highscoreFilter
        }).addTo(map);
        highIndex.clearLayers();  //remove previous layers
        showSlide2();
      });

      $("#Next-3").click(function() {
        highCollectors = L.geoJson(parsedData, {
          color: "pink",
          filter: highscoreCollector
        }).addTo(map);
        highArterials.clearLayers();  //remove previous layers
        showSlide3();
      });

      $("#Next-4").click(function() {
        //lowArterials = L.geoJson(parsedData, {
          //color: "green",
          //filter: lowscoreFilter
        //}).addTo(map);
        highCollectors.clearLayers();  //remove previous layers
        showSlide4();
      });

      $("#Next-5").click(function() {
        highArterials= L.geoJson(parsedData, {
          color: "magenta",
          filter: highscoreFilter
        }).addTo(map);
        highCollectors = L.geoJson(parsedData, {
          color: "pink",
          filter: highscoreCollector
        }).addTo(map);
        showSlide5();
      });

      $("#Previous-1").click(function() {
        highIndex = L.geoJson(parsedData, {
          color: "red",
          filter: hIndex
        }).addTo(map);
        startingData.clearLayers();  //remove previous layers
        hideSlide1();
      });

      $("#Previous-2").click(function() {
        highArterials= L.geoJson(parsedData, {
          color: "black",
          filter: highscoreFilter
        }).addTo(map);
        highIndex.clearLayers();  //remove previous layers
        hideSlide2();
      });

      $("#Previous-3").click(function() {
        highCollectors = L.geoJson(parsedData, {
          color: "green",
          filter: highscoreCollector
        }).addTo(map);
        highArterials.clearLayers();  //remove previous layers
        hideSlide3();
      });

      $("#Previous-4").click(function() {
        //lowArterials = L.geoJson(parsedData, {
          //color: "green",
          //filter: lowscoreFilter
        //}).addTo(map);
        highCollectors.clearLayers();  //remove previous layers
        hideSlide4();
      });

      $("#Previous-5").click(function() {
        highArterials= L.geoJson(parsedData, {
          color: "black",
          filter: highscoreFilter
        }).addTo(map);
        highCollectors = L.geoJson(parsedData, {
          color: "green",
          filter: highscoreCollector
        }).addTo(map);
        hideSlide5();
      });

    });
});
