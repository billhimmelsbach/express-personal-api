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

// var db = require('./models');

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
  favorite_books: [{title: "Papers Please", genre: "Political Simulation", platform: "PC, Mac, iPad"}, {name: "Undertale", genre: "Story-driven Adventure", platform: "PC"}, {name: "Keep Talking And No One Explodes", type: "Indie Party Game", platform: "Mac, PC"}],
  favorite_video_games: [{name: "Papers Please", genre: "Political Simulation", platform: "PC, Mac, iPad"}, {name: "Undertale", genre: "Story-driven Adventure", platform: "PC"}, {name: "Keep Talking And No One Explodes", type: "Indie Party Game", platform: "Mac, PC"}],
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
