var express = require('express');
var app = express();
var yelp = require('./yelp');
//require request handler


// serves static pages
// unsure if this will work with angular routing for views at the moment*******
app.use(express.static(__dirname + '/../client/'))


// post request for food search. sends back top 3 results as JSON
app.post('/imhungry', function (req, res) {
  // var search = req.param('search');
  // var location = req.param('location');
  //...

  //receivng json request from client with keys search, loc, distance, stars
  yelp.searchYelp(search, location, distance, stars, req, res);
});



app.listen(3000);