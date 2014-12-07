var express = require('express');
var app = express();
var yelp = require('./yelp');
var geocoder = require('./geocoder');
// var passport = require('./auth')
// var authHelpers = require('./authHelpers');
var db = require('./databaseHelpers');
var bodyParser = require('body-parser');

// serves static pages
// *********unsure if this will work with angular routing for views, not yet tested with client*******
app.use(express.static(__dirname + '/../client/'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(express.session({secret: '12345'}));


// post request for food search. sends back top 3 results as JSON
app.post('/imhungry', function (req, res) {
  //******* unsure if req.param works currently, might need to use body parse, not yet tested with client **********
  var search = req.param('search');
  var distance = req.param('distance');
  var stars = req.param('stars');
  var location = req.param('loc');
  var lat = location.latitude;
  var lon = location.longitude;
  // var lon = req.param('loc.longitude');  

  console.log(req.param('search'));
  console.log(req.param('distance'));
  console.log(req.param('stars'));
  console.log(req.param('loc'));
  // console.log(req.param('loc.longitude'));

  //searches yelp, gets businesses and replies with reponse 200 and data
  yelp.searchYelp(search, distance, stars, lat, lon, req, res);
});

//handles login form
//first argument of passport.authenticate is the strategy to use
// app.post('/login',
// 	passport.authenticate('local', {
// 		successRedirect: '/',
// 		failureRedirect: '/login',
// 		// failureFlash: true
// 	})
// );

// //takes an object of the form: {username: jon, password: 123}
app.post('/signup', function(req, res) {
	//search to see if user already exists
	db.findOne({username: req.body.username}, function(error, doc){
		//if not found, add to database, otherwise redirect to login page
		if (!doc) {
			db.addUserToDatabase(req.body);
			res.send('');
		} else {
			throw error;
		}
	})
});

//takes object of form {username: jon, restaurant: yum}
//adds to likes if not already there
app.post('/like', function(req, res, next){
	var username = req.body.username;
	var restaurant = req.body.restaurant;
	if (!db.isInLikes(username, restaurant)) {
		addRestaurantToLikes(username, restaurant)
	} else {
		console.log('already in likes');
	}
});

//takes object of form {username: jon, restaurant: yum}
//adds to dislikes if not already there
app.post('/dislike', function(req, res, next){
	var username = req.body.username;
	var restaurant = req.body.restaurant;
	if (!db.isInDislikes(username, restaurant)) {
		addRestaurantToDislikes(username, restaurant)
	} else {
		console.log('already in likes');
	}
});


app.listen(3000);







// app.get('/login', loggedIn, function(req, res, next) {
//     // req.user - will exist
//     // load user orders and render them
// });

// app.get('/signup', loggedIn, function(req, res, next) {
//     // req.user - will exist
//     // load user orders and render them
// });

// app.get('/likes', loggedIn, function(req, res, next) {
// 	res.redirect('/likes');
//     // req.user - will exist
//     // load user orders and render them
// });