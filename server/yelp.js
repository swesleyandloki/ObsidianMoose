var exports = module.exports = {};
var helpers = require('./helpers.js');
var _ = require('lodash');

// Refer to Yelp API docs for more info: http://www.yelp.com/developers/documentation/v2/search_api


//config file holds our secret keys you can't see, request your own from yelp and enter them in 'server/env/config.js'
var yelp = require('./env/config');

// requiring a Yelp npm module to easily query Yelp
var yelp = require("yelp").createClient(yelp.keys);



// **test call**
// yelp.search({term: "burrito", location: "944 Market St #8, San Francisco, CA 94102", radius_filter: 5000, sort: 1, limit: 20}, function(error, data) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(getsNineClosestEateries(2, data.businesses));
// });




var searchYelp = function(search, location, distance, stars, req, res) {
  // sending to yelp api:
  // search = keyword user inputs; string
  // location = address; string
  // distance = meters from address; integer
  // stars = user specified rating; integer
  // sort 1 = sort by distance; integer
  // limit = # of results; integer\

  distance = milesToMetersFloored(distance);
  yelp.search({term: search, location: location, radius_filter: distance, sort: 1, limit: 30}, function(error, data) {
    if (error) {
      console.log(error);
    }
    // console.log(data.businesses);
    //pass in user's specified star rating for search
    var businessJson = {businesses: getsNineClosestEateries(stars, data.businesses)};
    console.log(businessJson);
    helpers.sendResponse(res, businessJson, 200);
  });
};


// converts mileage user inputs to meters to make yelp api happy
var milesToMetersFloored = function(mileage) {
  return mileage * 1609;
};




var getsNineClosestEateries = function(usersStars, array) {
  var results = [];

  _.each(array, function(restaurant) {
    if (restaurant.rating >= usersStars) {
      results.push({
        name: restaurant.name,
        address: restaurant.location.display_address,
        rating: restaurant.rating,
        image_url: restaurant.image_url
      });
    }
  });
  return results.slice(0,9);
};


exports.searchYelp = searchYelp;