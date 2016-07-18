console.log("Sanity Check: JS is working!");
//google API test
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
var template;
var $tripsList;
var allTrips = [];
$(document).ready(function(){

    $tripsList = $('#tripTarget');

    // creates a helper function for handlebars that replaces \n pulled from the database with <br> tags
    Handlebars.registerHelper('breaklines', function(text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    });

    //compiles handlebars template
    var source = $('#trips-template').html();
    template = Handlebars.compile(source);

//pulls a JSON of the trip data
    $.ajax({
      method: 'GET',
      url: '/api/trips',
      success: handleSuccess,
      error: handleError
    });

//on click of the new trip button, POSTSs new trip based on forms
    $('#newTripForm').on('submit', function(event) {
      event.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/trips',
        data: $(this).serialize(),
        success: newTripSuccess,
        error: newTripError
      });
    });

//on click of the delete this trip button, DELETE trip based on ID
    $tripsList.on('click', '.deleteBtn', function() {
      $.ajax({
        method: 'DELETE',
        url: '/api/trips/'+$(this).attr('data-id'),
        success: deleteTripSuccess,
        error: deleteTripError
      });
    });

  });

  //function that renders data on AJAX success: removes all posts, passes allTrips to template, appends HTML
  function render () {
    $tripsList.empty();
    var tripsHtml = template({ trips: allTrips });
    $tripsList.append(tripsHtml);
  }

  function handleSuccess(json) {
    allTrips = json;
    render();
  }

  function handleError(event) {
    console.log('uh oh');
    $('#tripTarget').text('Failed to load trips, is the server up?');
  }

  function newTripSuccess(json) {
    $('#newTripForm input').val('');
    allTrips.push(json);
    render();
    $('textarea').val('');
  }

  function newTripError() {
    $('#tripTarget').text('Failed to load trips, is the server up?');
  }

  // find the trip by ID, remove from allTrips array
  function deleteTripSuccess(json) {
    var trip = json;
    var tripId = trip._id;
    for(var index = 0; index < allTrips.length; index++) {
      if(allTrips[index]._id === tripId) {
        allTrips.splice(index, 1);
        break;
      }
    }
    render();
  }

  function deleteTripError() {
    $('#tripTarget').text('Failed to load trips, is the server up?');
  }
