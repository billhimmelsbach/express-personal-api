console.log("Sanity Check: JS is working!");
//google API test

var address;
var template;
var $ridesList;
var mapHidden=1;
var allRides = [];
$(document).ready(function(){

    $ridesList = $('#rideTarget');
    // creates a helper function for handlebars that replaces \n pulled from the database with <br> tags
    Handlebars.registerHelper('breaklines', function(text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    });

    //compiles handlebars template
    var source = $('#rides-template').html();
    template = Handlebars.compile(source);

//pulls a JSON of the ride data
    $.ajax({
      method: 'GET',
      url: '/api/rides',
      success: handleSuccess,
      error: handleError
    });

//on click of the new ride button, POSTSs new ride based on forms
    $('#newRideForm').on('submit', function(event) {
      event.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/rides',
        data: $(this).serialize(),
        success: newRideSuccess,
        error: newRideError
      });
    });

//on click of the delete this ride button, DELETE ride based on ID
    $ridesList.on('click', '.deleteBtn', function() {
      $.ajax({
        method: 'DELETE',
        url: '/api/rides/'+$(this).attr('data-id'),
        success: deleteRideSuccess,
        error: deleteRideError
      });
    });

  });

  //function that renders data on AJAX success: removes all posts, passes allRides to template, appends HTML
  function render () {
    $ridesList.empty();
    var ridesHtml = template({ rides: allRides });
    $ridesList.append(ridesHtml);
  }

  function handleSuccess(json) {
    allRides = json;
    render();
  }

  function handleError(event) {
    console.log('uh oh');
    $('#rideTarget').text('Failed to load rides, is the server up?');
  }

  function newRideSuccess(json) {
    $('#newRideForm input').val('');
    allRides.push(json);
    render();
    $('textarea').val('');
  }

  function newRideError() {
    $('#rideTarget').text('Failed to load rides, is the server up?');
  }

  // find the ride by ID, remove from allRides array
  function deleteRideSuccess(json) {
    var ride = json;
    var rideId = ride._id;
    for(var index = 0; index < allRides.length; index++) {
      if(allRides[index]._id === rideId) {
        allRides.splice(index, 1);
        break;
      }
    }
    render();
  }

  function deleteRideError() {
    $('#rideTarget').text('Failed to load rides, is the server up?');
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
$('.floatMap').animate({marginLeft: '0%'}, 350);
$('.floatMap').css('position', 'fixed');
$('.submit').val('Hide it!');
mapHidden--;
}
else {
  $('.floatMap').animate({marginLeft: '+100%'}, 350);
  $('.submit').val('Map it!');
  mapHidden++;
}
$('.floatMap').blur();
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
      // alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
