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
var highIndex;
var highArterials;
var highCollectors;
var lowArterials;
var corridors;
var majArts;
var minArts;
var collectors;

var promise = "https://raw.githubusercontent.com/sydng/OST4GIS-Midterm/master/litter_index_lines.geojson";
var promise2 = "https://raw.githubusercontent.com/sydng/OST4GIS-Midterm/master/Commercial_Corridors.geojson";

var fitBoundsOptions = { padding: [5, 5] };

//FUNCTIONS FOR FILTERING DATA
var majorArterials = function(feature){
  if(feature.properties.street_class == 2) {
    return feature;
  }
};

var minorArterials = function(feature){
  if(feature.properties.street_class == 3) {
    return feature;
  }
};

var collectors = function(feature){
  if(feature.properties.street_class == 4) {
    return feature;
  }
};

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
  if(feature.properties.street_class == 3 ||
        feature.properties.street_class == 2 ||
        feature.properties.street_class == 4) {
    return feature;
  }
};

var zoom = function(feature) {
    map.fitBounds(feature.getBounds(), fitBoundsOptions);
};

var clearFunc;
var clearSegments = function() {
  if (_.isFunction(clearFunc)) { clearFunc(); } else { console.log("no clearing function defined"); }
};

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

var hideLegend = function() {
  $('#legend').hide();
};

var showLegend = function() {
  $('#legend').show();
};

var myStyle = function(feature) {
  switch(feature.properties.street_class_name) {
    case "Major Arterial": return {color: "red"};
    case "Collector": return {color: "orange"};
    case 'Minor Arterial': return {color: "yellow"};
    case '': return {color: "green"};
    case 'Local': return {color: "pink"};
    case 'City Boundary': return {color: "blue"};
    case 'Non-travelable': return {color: "purple"};
  }
};

$(document).ready(function() {
    $.ajax(promise).done(function(data) {
      var parsedData = JSON.parse(data);
      majArts = L.geoJson(parsedData, {
        color: "lightgray",
        filter: majorArterials
      }).bindPopup(function(layer) {
        return layer.feature.properties.hundred_block_score.toString();
      });

      minArts = L.geoJson(parsedData, {
        color: "lightgray",
        filter: collectors
      }).bindPopup(function(layer) {
        return layer.feature.properties.hundred_block_score.toString();
      });

      collector = L.geoJson(parsedData, {
        color: "lightgray",
        filter: minorArterials
      }).bindPopup(function(layer) {
        return layer.feature.properties.hundred_block_score.toString();
      });

      startingData = L.geoJson(parsedData, {
        color: "lightgray",
        filter: stInterest
      }).bindPopup(function(layer) {
          return layer.feature.properties.hundred_block_score.toString();
        }).addTo(map);
      zoom(startingData);
      hideLegend();

      $('#sel').change(function() {
        startingData.clearLayers();
        if ($('#sel').val() == "Major Arterial") {
          clearSegments();
          majArts.addTo(map);
          clearFunc = function() { map.removeLayer(majArts); };
        } else if($('#sel').val() == "Minor Arterial") {
          clearSegments();
          minArts.addTo(map);
          clearFunc = function() { map.removeLayer(minArts); };
        } else if($('#sel').val() == "Collector") {
          clearSegments();
          collector.addTo(map);
          clearFunc = function() { map.removeLayer(collector); };
        } else {
          clearSegments();
          startingData.addTo(map);
          clearFunc = function() { map.removeLayer(startingData); };
        }
      });

      $("#Next-1").click(function() {
        highIndex = L.geoJson(parsedData, {
          color: "red",
          filter: hIndex
        }).addTo(map);
        zoom(highIndex);
        startingData.clearLayers();
        clearSegments();
        showSlide1();
      });

      $("#Next-2").click(function() {
        highArterials= L.geoJson(parsedData, {
          color: "#DC143C",
          filter: highscoreFilter
        }).addTo(map);
        highIndex.clearLayers();  //remove previous layers
        showSlide2();
      });

      $("#Next-3").click(function() {
        highCollectors = L.geoJson(parsedData, {
          color: "#800000",
          filter: highscoreCollector
        }).addTo(map);
        highArterials.clearLayers();  //remove previous layers
        showSlide3();
      });

      $("#Next-4").click(function() {
        $.ajax(promise2).done(function(data) {
          var data2 = JSON.parse(data);
        corridors = L.geoJson(data2, {
          color: "gray"
        }).addTo(map);
        zoom(corridors);
        highCollectors.clearLayers();  //remove previous layers
        showSlide4();
      });

      $("#Next-5").click(function() {
        highArterials= L.geoJson(parsedData, {
          color: "#DC143C",
          filter: highscoreFilter
        }).addTo(map);
        highCollectors = L.geoJson(parsedData, {
          color: "#800000",
          filter: highscoreCollector
        }).addTo(map);
        showSlide5();
      });

      $("#Previous-1").click(function() {
        startingData = L.geoJson(parsedData, {
          color: "lightgray",
          filter: stInterest
        }).bindPopup(function(layer) {
            return layer.feature.properties.hundred_block_score.toString();
          }).addTo(map);
        zoom(startingData);
        highIndex.clearLayers();  //remove previous layers
        hideSlide1();
      });

      $("#Previous-2").click(function() {
        highIndex = L.geoJson(parsedData, {
          color: "red",
          filter: hIndex
        }).addTo(map);
        zoom(highIndex);
        highArterials.clearLayers();  //remove previous layers
        hideSlide2();
      });

      $("#Previous-3").click(function() {
        highArterials= L.geoJson(parsedData, {
          color: "#DC143C",
          filter: highscoreFilter
        }).addTo(map);
        highCollectors.clearLayers();  //remove previous layers
        hideSlide3();
      });

      $("#Previous-4").click(function() {
        highIndex = L.geoJson(parsedData, {
          filter: hIndex
        });
        zoom(highIndex);
        highCollectors = L.geoJson(parsedData, {
          color: "#800000",
          filter: highscoreCollector
        }).addTo(map);
        corridors.clearLayers();
        hideSlide4();
      });

      $("#Previous-5").click(function() {
        highArterials.clearLayers();
        highCollectors.clearLayers();
        hideSlide5();
      });
    });
  });
});
