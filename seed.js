// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
// var currentTime = ((getMonth()+1) + "/" + getFullYear() + " @ " + getHours() + ":" + getMinutes());
// var currentTime= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
var currentTime= new Date();
var trips_list = [
  {
    title: "On The Kindness of Old Man Mobs",
    location: "Osaka, Japan",
    image: "images/oldmen.png",
    pullQuote: "Doumo arigatou. Doumo arigatou...",
    summary: "I was greeted by two broken spokes as I pulled my bike out of the ferry's storage area in Osaka, Japan. No explanation was given, and I probably wouldn't have been able to understand it even if they had offered one. So I sat down in the parking lot, pulled out my phone, and began watching YouTube videos of bike wizards threading magical bike spokes.\n\nI must have been quite the sight, since old men who worked at the dock began pooling around me. They offered advice I couldn't understand, but I was still so incredibly grateful. After a group of about a dozen old men had gathered, one old man came forward and threaded the spokes as if he was tying his shoes. I just kept repeating one of the only Japanese phrases I knew...\n\nDoumo arigatou. Doumo arigatou. Doumo arigatou.",
    tripTime: "Summer 2014",
    postTime: currentTime,
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
