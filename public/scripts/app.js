console.log("Sanity Check: JS is working!");
var template;
var $tripsList;
var allTrips = [];
$(document).ready(function(){

    $tripsList = $('#tripTarget');

    // compile handlebars template
    Handlebars.registerHelper('breaklines', function(text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    });
    
    var source = $('#trips-template').html();
    template = Handlebars.compile(source);

    $.ajax({
      method: 'GET',
      url: '/api/trips',
      success: handleSuccess,
      error: handleError
    });

    $('#newTripForm').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/trips',
        data: $(this).serialize(),
        success: newTripSuccess,
        error: newTripError
      });
    });

    $tripsList.on('click', '.deleteBtn', function() {
      $.ajax({
        method: 'DELETE',
        url: '/api/trips/'+$(this).attr('data-id'),
        success: deleteTripSuccess,
        error: deleteTripError
      });
    });

  });

  // helper function to render all posts to view
  // note: we empty and re-render the collection each time our post data changes
  function render () {
    // empty existing posts from view
    $tripsList.empty();

    // pass `allTrips` into the template function
    var tripsHtml = template({ trips: allTrips });

    // append html to the view
    $tripsList.append(tripsHtml);
  }

  function handleSuccess(json) {
    allTrips = json;
    render();
  }

  function handleError(e) {
    console.log('uh oh');
    $('#tripTarget').text('Failed to load trips, is the server working?');
  }

  function newTripSuccess(json) {
    $('#newTripForm input').val('');
    allTrips.push(json);
    render();
  }

  function newTripError() {

  }

  function deleteTripSuccess(json) {
    var trip = json;
    var tripId = trip._id;

    // find the trip with the correct ID and remove it from our allTrips array
    for(var index = 0; index < allTrips.length; index++) {
      if(allTrips[index]._id === tripId) {
        allTrips.splice(index, 1);
        break;  // we found our trip - no reason to keep searching (this is why we didn't use forEach)
      }
    }
    render();
  }

  function deleteTripError() {

  }
