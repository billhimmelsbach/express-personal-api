// require express module
var express = require('express'),
    app = express();

// parse incoming data from body object and populate req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//loads models
db = require('./models');

//load public folder
app.use(express.static('public'));

//HTML endpoints

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//JSON enpoints for API
 //sets a variable equal to current time for postDate
var currentTime= new Date();

app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to Bill's personal api! Here there be monsters and endpoints.",
    documentation_url: "https://github.com/billhimmelsbach/express-personal-api/blob/master/README.md",
    base_url: "https://evening-ravine-99895.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/rides", description: "Show all bike rides"},
      {method: "GET", path: "/api/rides/:id", description: "Show bike ride by ID"},
      {method: "POST", path: "/api/rides", description: "Create new bike ride using parameters from the form in the body"},
      {method: "PUT", path: "/api/rides", description: "Update bike ride using parameters from the form in the body"},
      {method: "DELETE", path: "/api/rides/:id", description: "Delete a bike ride by ID"},
    ]
  });
});

//GET profile information
app.get('/api/profile',function api_profile(req, res) {
  res.json({
  full_name: 'William "Bill" Joseph Himmelsbach',
  current_city: "Oakland, California",
  github_link: "https://github.com/billhimmelsbach",
  github_profile_image: "https://avatars.githubusercontent.com/billhimmelsbach",
  bicycle: "Surly Long Haul Disc Trucker",
  favorite_color: "#ffa500",
  favorite_books: [{title: "Pedagogy of the Oppressed", author: "Paulo Freire", release_year: "1968"}, {title: "Leaves of Grass", author: "Walt Whitman", release_year: "1855"}, {title: "Bitch Planet", author: "Kelly Sue DeConnick", release_date: "2016"}],
  favorite_video_games: [{name: "Papers Please", genre: "Political Simulation", platform: "PC, Mac, iPad"}, {name: "Undertale", genre: "Story-driven Adventure", platform: "PC"}, {name: "Keep Talking And No One Explodes", type: "Indie Party Game", platform: "Mac, PC"}],
  });
});

// GET index of all rides
app.get('/api/rides', function (req, res) {
  db.Ride.find({}, function(err, rides) {
    if (err) {
      res.send(404);
    }
    res.json(rides);
  });
});

//shows one ride by ID
app.get('/api/rides/:id', function (req, res) {
  db.Ride.findById(req.params.id, function(err, ride) {
    if (err) {
      res.sendStatus(404);
    }
    res.json(ride);
  });
});

// POST one new ride based on form data in body
app.post('/api/rides', function (req, res) {
  var newRide = new db.Ride({
    title: req.body.title,
    image: req.body.image,
    location: req.body.location,
    pullQuote: req.body.pullQuote,
    summary: req.body.summary,
    rideTime: req.body.rideTime,
    postTime: new Date(),
  });
     newRide.save(function(err, savedRide){
       if (err) {
         res.sendStatus(404);
       }
       res.json(savedRide);
     });
   });

// DELETE ride based on ID parameter
app.delete('/api/rides/:id', function (req, res) {
  var rideId = req.params.id;
  db.Ride.findOneAndRemove({ _id: rideId },function (err, deletedEntry){
    if (err) {
      res.sendStatus(404);
    }
    res.json(deletedEntry);
  });
});

// PUT ride based on ID parameter
app.put('/api/rides/:id/', function(req,res) {
  db.Ride.findById(req.params.id, function(err, rideToBeChanged){
      if (err) {
        res.sendStatus(404);
      }
      rideToBeChanged.title = req.body.title;
      rideToBeChanged.image = req.body.image;
      rideToBeChanged.location = req.body.location;
      rideToBeChanged.pullQuote = req.body.pullQuote;
      rideToBeChanged.summary = req.body.summary;
      rideToBeChanged.rideTime = req.body.rideTime;
      rideToBeChanged.save(function(err, updateRide){
        if (err) {
          res.sendStatus(404);
        }
        res.json(updateRide);
    });
  });
});

// server listens on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

//very important insanity check added by Nathan
// console.log("boop");
