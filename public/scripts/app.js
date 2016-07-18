console.log("Sanity Check: JS is working!");
//google API test

var mapHidden=1;
var address;
var template;
var $tripsList;
var allTrips = [];
$(document).ready(function(){
  // $('.btn-primary').on('click', function(event) {
  //     console.log("clicked!");
  //     address=$(this).val();
  //     geocodeAddress(geocoder, map);
  //     console.log("clicked!");
  //   });


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

  function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();

setTimeout(function() {
  $('.submit').on('click', function() {
address=$(this).attr('id');
if (mapHidden === 1) {
$('.floatMap').css('margin-left', '0%');
$('.floatMap').css('position', 'fixed');
mapHidden--;
}
else {
  $('.floatMap').css('margin-left', '+100%');
  $('.floatMap').css('position', 'absolute');
  mapHidden++;
}
console.log(address);
    console.log("test!");
    geocodeAddress(geocoder, map);
  });
  }, 3000);
}

function geocodeAddress(geocoder, resultsMap) {
  console.log(address);
  // var address = document.getElementById('address').value;
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
  //
  // setTimeout(function() {
  //    initMap(function() {
  //     console.log("test");
  //       var map = new google.maps.Map(document.getElementById('map'), {
  //       zoom: 8,
  //       center: {lat: -34.397, lng: 150.644}
  //     });
  //   });
  //   $('.address').on('click', function() {
  //     address= $(this).val();
  //     geocoder = new google.maps.Geocoder();
  //     geocodeAddress(geocoder, map);
  //     console.log(address);
  //     console.log("test again!");
  //   });
  //   }, 3000);
  //
  //
  //
  //   function geocodeAddress(geocoder, resultsMap) {
  //     geocoder.geocode({'address': address}, function(results, status) {
  //       if (status === google.maps.GeocoderStatus.OK) {
  //         resultsMap.setCenter(results[0].geometry.location);
  //         var marker = new google.maps.Marker({
  //           map: resultsMap,
  //           position: results[0].geometry.location
  //         });
  //       } else {
  //         alert('Geocode was not successful for the following reason: ' + status);
  //       }
  //     });
  //   }
