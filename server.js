// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */
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
      {method: "GET", path: "/api/trips", description: "Show all bike trips"},
      {method: "GET", path: "/api/trips/:id", description: "Show bike trip by ID"},
      {method: "POST", path: "/api/trips", description: "Create new bike trips"},
      {method: "DELETE", path: "/api/trips/:id", description: "Delete a bike trip by ID"},
    ]
  });
});
//
app.get('/api/profile',function api_profile(req, res) {
  res.json({
  full_name: 'William "Bill" Joseph Himmelsbach',
  current_city: "Oakland, California",
  github_link: "https://github.com/billhimmelsbach",
  github_profile_image: "https://avatars.githubusercontent.com/billhimmelsbach",
  bicycle: "Surly Long Haul Disc Trucker",
  favorite_color: "#ffa500",
  favorite_books: [{title: "Papers Please", genre: "Political Simulation", platform: "PC, Mac, iPad"}, {name: "Undertale", genre: "Story-driven Adventure", platform: "PC"}, {name: "Keep Talking And No One Explodes", type: "Indie Party Game", platform: "Mac, PC"}],
  favorite_video_games: [{name: "Papers Please", genre: "Political Simulation", platform: "PC, Mac, iPad"}, {name: "Undertale", genre: "Story-driven Adventure", platform: "PC"}, {name: "Keep Talking And No One Explodes", type: "Indie Party Game", platform: "Mac, PC"}],
  });
});

app.get('/api/trips', function (req, res) {
  // send all trips as JSON response
  db.Trip.find()
  // populate fills in the author id with all the author data
  .populate('author')
  .exec(function(err, trips){
    if (err) { return console.log("index error: " + err); }
    res.json(trips);
  });
});

// get one trip
app.get('/api/trips/:id', function (req, res) {
  db.Trip.findById(req.params.id)
  .populate('author')
  .exec( function(err, trip){
    if (err) { return console.log("show error: " + err); }
    res.json(trip);
  });
});

// create new trip
app.post('/api/trips', function (req, res) {
  // create new trip with form data (`req.body`)
  var newTrip = new db.Trip({
    title: req.body.title,
    image: req.body.image,
    pullQuote: req.body.pullQuote,
    summary: req.body.summary,
    tripTime: req.body.tripTime,
    postTime: new Date(),
  });
  // this code will only add an author to a trip if the author already exists
   db.Trip.findOne({name: req.body.author}, function(err, author){
     if (author === null) {
       console.log("author not found");
       res.status(404);
     }
     console.log(author);
     newTrip.author = author;
     // add newTrip to database
     newTrip.save(function(err, savedTrip){
       if (err) {
         return console.log("create error: " + err);
       }
       res.json(savedTrip);
     });
   });
 });



//get all authors
app.get('/api/authors', function (req, res) {
  // send all trips as JSON response
  db.Author.find()
  // populate fills in the author id with all the author data
  .exec(function(err, trips){
    if (err) { return console.log("index error: " + err); }
    res.json(trips);
  });
});


// delete trip
app.delete('/api/trips/:id', function (req, res) {
  // get trip id from url params (`req.params`)
  console.log(req.params);
  var tripId = req.params.id;

  db.Trip.findOneAndRemove({ _id: tripId },function (err, deletedEntry){
    res.json(deletedEntry);
  });
});

// delete author
app.delete('/api/authors/:id', function (req, res) {
  // get author id from url params (`req.params`)
  console.log(req.params);
  var authorID = req.params.id;

  db.Author.findOneAndRemove({ _id: authorId },function (err, deletedAuthor){
    res.json(deletedAuthor);
  });
});

//I GET THE INFORMATION FROM THE USER Bill Harper = Harper LEE]]--- WHAT I WANT TO CHANGE (I WANT THE TITLE)
//THEN I FIND THE TRIP I WANT TO CHANGE BY ID PARAMATER (THIS IS THE TRIP I WANT TO CHANGE)
//THEN I TAKE THE INFORMATION I GOT FROM THE USER AND THEN CHANGE THE TRIP I FOUND


//grab a trip and edit it
app.put('/api/trips/:id/:title', function(req,res) {
  db.Trip.findById(req.params.id, function(err, tripToBeChanged){
    tripToBeChanged.title=req.params.title; //what we want changed
    // add newTrip to database
    tripToBeChanged.save(function(err, trip){
      if (err) {
        return console.log("create error: " + err);
      }
      console.log("created ", trip.title);
      res.json(trip);
    });
  });
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

console.log("boop");
