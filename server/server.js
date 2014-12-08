var express = require('express');
var app = express();
var yelp = require('./yelp');
var geocoder = require('./geocoder');
// var passport = require('./auth')
// var authHelpers = require('./authHelpers');
var db = require('./databaseHelpers');
var bodyParser = require('body-parser');
var util = require('./authHelpers');
var auth = require('./auth');

// serves static pages
// *********unsure if this will work with angular routing for views, not yet tested with client*******
app.use(express.static(__dirname + '/../client/'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




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

// //takes an object of the form: {username: bob, password: 123}

// app.post('/signup', function(req, res) {
// 	var userObject = {username: 'am', password: 1234} || req.body;
// 	db.addUserToDatabase(userObject, function(){res.end('success')});
// 	//search to see if user already exists
// });

app.post('/login', function(req, res){
	
});

app.post('/signin', auth.login);
app.post('/signup', auth.signup);
app.get('/signedin', auth.checkAuth);

//takes object of form {username: jon, restaurant: yum}
//adds to likes if not already there
app.post('/like', function(req, res, next){
	console.log(req.body);
	var username = req.body.username || 'kim';
	var restaurant = req.body.restaurant || 'hi';
	console.log(username, restaurant);
	db.isInLikes(username, restaurant, function(result) {
		if (!result) {
			db.addRestaurantToLikes(username, restaurant)
		} else {
			console.log('already in likes')
		}
	});
});


//takes object of form {username: jon, restaurant: yum}
//adds to dislikes if not already there
app.post('/dislike', function(req, res, next){
	console.log(req.body);
	var username = req.body.username || 'kim';
	var restaurant = req.body.restaurant || 'hi';
	console.log(username, restaurant);
	db.isInDislikes(username, restaurant, function(result) {
		if (!result) {
			db.addRestaurantToDislikes(username, restaurant)
		} else {
			console.log('already in dislikes')
		}
	});
});

app.get('/likes', function(req, res, next) {
	var username = 'kim';
	db.getLikes(username, function(likes) {res.send(likes)});
});

app.get('/dislikes', function(req, res, next) {
	var username = 'kim';
	db.getDislikes(username, function(dislikes) {res.send(dislikes)});
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
