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
var litterIndex;
var majorArterials;
//var recycleBank;

var promise = "https://raw.githubusercontent.com/sydng/OST4GIS-Midterm/master/litter_index_lines.geojson";
//var promise2 = "https://raw.githubusercontent.com/sydng/OST4GIS-Midterm/master/WasteBaskets_Big_Belly.geojson";
//var promise3 = "https://raw.githubusercontent.com/sydng/OST4GIS-Midterm/master/recyclebank_participation.geojson";

var myStyle = function(feature) {
  switch(feature.properties.street_class) {
    case 2: return {color: "red"};      //major arterial
    case 3: return {color: "orange"};   //minor arterial
    case 4: return {color: "yellow"};   //collector street
    case 5: return {color: "purple"};   //local road
    case 6: return {color: "blue"};
    case 12: return {color: "white"};
    case 13: return {color: "black"};
    case 14: return {color: "pink"};
    case 18: return {color: "green"};
  }
};

var lowscoreFilter = function(feature) {
  if(feature.properties.hundred_block_score <= 1 &&
     feature.properties.street_class == 2) {
          return feature;
      }
};

var medscoreFilter = function(feature) {
  if(feature.properties.hundred_block_score > 1.5 &&
    feature.properties.hundred_block_score <= 3.5 &&
    feature.properties.street_class == 2) {
          return feature;
      }
};

var highscoreFilter = function(feature) {
  if(feature.properties.hundred_block_score > 3.5 && feature.properties.street_class == 2) {
          return feature;
      }
};

var stInterest = function(feature) {
  if(feature.properties.street_class == 3) {
    return feature;
  }
};

var arterials = function(feature) {
  if(feature.properties.street_class == 2) {
    return feature;
  }
};

$(document).ready(function() {
  $.ajax(promise).done(function(data) {
    var parsedData = JSON.parse(data);
    majorArterials = L.geoJson(parsedData, {
      style: myStyle,
      filter: arterials
    }).addTo(map);

    litterIndex = L.geoJson(parsedData, {
      color: "lightgray",
      filter: stInterest
    }).addTo(map);
    //litterIndex.eachLayer(eachFeatureFunction);
  });
});
