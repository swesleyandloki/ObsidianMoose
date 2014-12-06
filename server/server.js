var express = require('express');
var app = express();
var yelp = require('./yelp');
var geocoder = require('./geocoder');


// serves static pages
// *********unsure if this will work with angular routing for views, not yet tested with client*******
app.use(express.static(__dirname + '/../client/'))


// post request for food search. sends back top 3 results as JSON
app.post('/imhungry', function (req, res) {
  //******* unsure if req.param works currently, might need to use body parse, not yet tested with client **********
  var search = req.param('search');
  var distance = req.param('distance');
  var stars = req.param('stars');
  var lat = req.param('location.latitude');
  var lon = req.param('location.longitude');

  //searches yelp, gets businesses and replies with reponse 200 and data
  yelp.searchYelp(search, distance, stars, lat, lon, req, res);
});



app.listen(3000);