// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var trips_list = [
  {
  title: "On The Kindness of Old Man Mobs",
  image: "images/oldmen.png",
  releaseDate: "July 11, 1960"
  },
];

db.Trip.remove({}, function(err, trips){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all trips');

    // create new records based on the array trips_list
    db.Trip.create(trips_list, function(err, trips){
      if (err) { return console.log('err', err); }
      console.log("created", trips.length, "trips");
      process.exit();
    });
  }
});
