var exports = module.exports = {};
// helper methods
var helpers = require('./helpers.js');


// Refer to Yelp API docs for more info: http://www.yelp.com/developers/documentation/v2/search_api

//config file holds our secret keys you can't see, request your own from yelp
var yelp = require('./env/config');

// requiring a Yelp npm module to easily query Yelp
var yelp = require("yelp").createClient(yelp.keys);



// **test call**
// yelp.search({term: "burrito", location: "944 Market Street, #8, San Francisco, CA 94102", radius_filter: 5000, sort: 1, limit: 3}, function(error, data) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(data.businesses);
// });




var searchYelp = function(search, location, distance, stars, req, res) {
  // sending to yelp api:
  // search = keyword user inputs; string
  // location = address; string
  // distance = meters from address; integer
  // sort 1 = sort by distance; integer
  // limit = # of results; integer\

  distance = milesToMetersFloored(distance);
  yelp.search({term: search, location: location, radius_filter: distance, sort: 1, limit: 30}, function(error, data) {
    if (error) {
      console.log(error);
    }
    console.log(data.businesses);
  });
};

// converts mileage user inputs to meters to make yelp api happy
var milesToMetersFloored = function(mileage) {
  return mileage * 1609;
};


// todo: write function to loop over result and only get ones that meet stars criteria, meets or higher














// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business("yelp-san-francisco", function(error, data) {
//   console.log(error);
//   console.log(data);
// });


exports.searchYelp = searchYelp;