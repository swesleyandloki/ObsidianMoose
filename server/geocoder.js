var exports = module.exports = {};
var geocoderProvider = 'google';
var httpAdapter = 'http';

var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);


var getAddress = function(lat, lon, cb) {
  var address;
  geocoder.reverse(lat, lon, function(err, res) {
    //response is an array with a single object
    var addressArray = [res[0].streetNumber + ' ' + res[0].streetName, res[0].city, res[0].state, res[0].zipcode];
    //passes stringified & formatted address to callback
    cb(addressArray.join(', '));
  });
};


exports.getAddress = getAddress;