var exports = module.exports = {};
var helpers = require('./helpers.js');
var geocoder = require('./geocoder.js');
var _ = require('lodash');
//config file holds our secret keys you can't see, request your own from yelp and enter them in 'server/env/config.js'
var yelp = require('./env/config');
// requiring a Yelp npm module to easily query Yelp
var yelp = require("yelp").createClient(yelp.keys);


// Refer to Yelp API docs for more info: http://www.yelp.com/developers/documentation/v2/search_api


var searchYelp = function(search, distance, stars, lat, lon, req, res) {
  var address;
  //yelp accepts meters for distance
  distance = milesToMetersFloored(distance);

  //geocoder module talks to maps api to reverse geocode lat and lon to address
  geocoder.getAddress(lat, lon, function(address) {
    // callback queries yelp with address
    // sending to yelp api:
    // search = keyword user inputs; string
    // stars = user specified rating; integer
    // sort 1 = sort by distance; integer
    // limit = # of results; integer
    yelp.search({term: search, location: address, radius_filter: distance, sort: 1, limit: 25}, function(error, data) {
      if (error) {
        console.log(error);
      }
      var businessJson = {businesses: getsNineClosestEateries(stars, data.businesses)};
      //send back success response with data
      helpers.sendResponse(res, businessJson, 200);
    });
  });
};


// converts mileage user inputs to meters to make yelp api happy
var milesToMetersFloored = function(mileage) {
  return mileage * 1609;
};


//narrows down results from 25 to 9 closest that meet user's specified star rating from search
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