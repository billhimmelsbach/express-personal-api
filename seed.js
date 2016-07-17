// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
// var currentTime = ((getMonth()+1) + "/" + getFullYear() + " @ " + getHours() + ":" + getMinutes());
// var currentTime= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
var currentTime= new Date();
var trips_list = [
  {
    title: "On Tacos, Donuts, and Love",
    location: "Savannah, Tennessee",
    image: "images/donut.png",
    pullQuote: "I found love...",
    summary: "What you see before you is real. The small town of Savannah, Tennessee is home to the impossible combination of donut and taco shop. Also, free WIFI because reasons. It caught my eye as I biked by, and I camped out inside it the entire day, eating my weight in equal parts donut and taco. As I left that night, the owner, who I has spent the day talking to, stopped me. She gave me a giant sack overflowing with free donut holes.\n\nLate that night, when I had my second flat tire in the pitch black of rural Tennessee, I found love at the bottom of that bag.",
    tripTime: "2014-01-22",
    postTime: currentTime,
  },
  {
    title: "On Spider Island",
    location: "Seoul, South Korea",
    image: "images/spiderIsland.png",
    pullQuote: "Crawling inches away from my head as I slept...",
    summary: "We named it Spider Island. It was a small campsite on an island just outside of a city south of Seoul. Spider Island was perfect for us, well except for the spiders. I have always been absolutely terrified of spiders, and every night they would envelop our tents in web prisons that we had to tear through every morning.\n\nWe spent three nights there as one of my friend's fought off the flu. Three nights of spiders crawling inches away from my head as I slept.\n\nI would not recommend Spider Island. 3/10",
    tripTime: "2014-07-09",
    postTime: currentTime,
  },
  {
    title: "On the Kindness of Old Man Mobs",
    location: "Osaka, Japan",
    image: "images/oldmen.png",
    pullQuote: "Doumo arigatou. Doumo arigatou...",
    summary: "I was greeted by two broken spokes as I pulled my bike out of the ferry's storage area in Osaka, Japan. No explanation was given, and I probably wouldn't have been able to understand it even if they had offered one. So I sat down in the parking lot, pulled out my phone, and began watching YouTube videos of bike wizards threading magical bike spokes.\n\nI must have been quite the sight, since old men who worked at the dock began pooling around me. They offered advice I couldn't understand, but I was still so incredibly grateful. After a group of about a dozen old men had gathered, one old man came forward and threaded the spokes as if he was tying his shoes. I just kept repeating one of the only Japanese phrases I knew...\n\nDoumo arigatou. Doumo arigatou. Doumo arigatou...",
    tripTime: "2014-07-28",
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
